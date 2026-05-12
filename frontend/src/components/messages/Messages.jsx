import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages"; //  NAYI LINE: Hook ko import kiya

const Messages = () => {
    const { messages, loading } = useGetMessages();
    useListenMessages(); // 

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {!loading && messages?.length > 0 && messages.map((message) => (
                <Message key={message._id} message={message} />
            ))}

            {!loading && messages?.length === 0 && (
                <p className='text-center text-gray-300'>Send a message to start the conversation</p>
            )}
            
            {loading && (
                <div className="flex justify-center items-center h-full">
                    <span className="loading loading-spinner text-info"></span>
                </div>
            )}
        </div>
    );
};
export default Messages;