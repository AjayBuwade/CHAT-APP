import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    // 👈 Zustand se messages aur setMessages dono le liye taaki UI instantly update ho
    const { selectedConversation, messages, setMessages } = useConversation();

    if (!message) return null;

    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    
    // 👈 FIX: Agar photo na mile toh default avatar lag jayega, aur "Tailwi" ganda text nahi dikhega
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic || "https://avatar.iran.liara.run/public/boy";
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";
    const shakeClass = message.shouldShake ? "shake" : "";

    // 👈 DELETE FUNCTION
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this message?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/messages/${message._id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);

            // Screen se message turant hata do (bina refresh kiye)
            setMessages(messages.filter((m) => m._id !== message._id));
        } catch (error) {
            console.error(error.message);
            alert("Failed to delete message");
        }
    };

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img alt='user avatar' src={profilePic} />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
                {message.message}
            </div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center mt-1'>
                {formattedTime}
                {/* 👈 DELETE BUTTON: Sirf usko dikhega jisne message bheja hai */}
                {fromMe && (
                    <span onClick={handleDelete} className="cursor-pointer text-red-400 hover:text-red-600 ml-2 font-bold" title="Delete Message">
                        🗑️
                    </span>
                )}
            </div>
        </div>
    );
};
export default Message;