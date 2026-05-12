import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import { MdDeleteOutline } from "react-icons/md"; // 👈 Delete icon import kiya

const Conversation = ({ conversation, lastIdx }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === conversation._id;
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);

    // USER DELETE LOGIC
    const handleDeleteUser = async (e) => {
        e.stopPropagation(); // 👈 Isse button dabane par chat open nahi hogi
        const confirmDelete = window.confirm(`Are you sure you want to PERMANENTLY DELETE ${conversation.fullName}'s account ?`);
        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/users/${conversation._id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);

            alert("User deleted permanently!");
            window.location.reload(); // 👈 Page refresh karega taaki list update ho jaye
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <div
                className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
                ${isSelected ? "bg-sky-500" : ""}
            `}
                onClick={() => setSelectedConversation(conversation)}
            >
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className='w-12 rounded-full'>
                        {/* 👈 Broken image fix yahan bhi laga diya */}
                        <img src={conversation.profilePic || "https://avatar.iran.liara.run/public/boy"} alt='user avatar' />
                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between items-center'>
                        <p className='font-bold text-gray-200'>{conversation.fullName}</p>
                        
                        {/* 👈 DELETE USER BUTTON */}
                        <button onClick={handleDeleteUser} className="text-red-400 hover:text-red-700 transition-colors" title="Delete User Completely">
                            <MdDeleteOutline size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {!lastIdx && <div className='divider my-0 py-0 h-1' />}
        </>
    );
};
export default Conversation;