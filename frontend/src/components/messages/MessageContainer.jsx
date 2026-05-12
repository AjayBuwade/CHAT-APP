import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { MdDeleteSweep } from "react-icons/md"; 

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation, setMessages } = useConversation();

    useEffect(() => {
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    // CLEAR CHAT LOGIC
    const handleClearChat = async () => {
        const confirmClear = window.confirm(`Are you sure you want to delete all messages with ${selectedConversation.fullName}?`);
        if (!confirmClear) return;

        try {
            const res = await fetch(`/api/messages/clear/${selectedConversation._id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);

            // UI se saare messages turant gayab kar do
            setMessages([]);
            alert("Chat cleared!");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className='md:min-w-[450px] flex flex-col h-full'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    {/* Header */}
                    <div className='bg-slate-500 px-4 py-2 mb-2 flex justify-between items-center'>
                        <div>
                            <span className='label-text text-gray-200'>To:</span>{" "}
                            <span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
                        </div>
                        
                        {/* CLEAR CHAT BUTTON */}
                        <button 
                            onClick={handleClearChat}
                            className="text-red-900 hover:text-red-200 flex items-center gap-1 font-semibold text-sm transition-all"
                            title="Clear Full Chat"
                        >
                            <MdDeleteSweep size={22} />
                            Clear Chat
                        </button>
                    </div>

                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    );
};
export default MessageContainer;

// 👇 Yeh wala hissa miss ho gaya tha pichli baar!
const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome 👋 {authUser?.fullName} ❄</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    );
};