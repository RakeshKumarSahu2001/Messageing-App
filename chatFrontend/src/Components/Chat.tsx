import { useEffect, useRef } from "react";
import useChatStore from "../store/useChatStore"
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import useAuthStore from "../store/useAuthStore";
import moment from "moment";

function Chat() {
const {selectedUser,messages,getMessages,subscribeToMessages,unsubscribeFromMessages}=useChatStore();
const { authUser } = useAuthStore();
const messageEndRef=useRef();

useEffect(()=>{
  if(!selectedUser?.id){
    return;
  }
  getMessages(selectedUser?.id as string);

  subscribeToMessages()

  return ()=>unsubscribeFromMessages();
},[selectedUser,messages])

// useEffect(()=>{
//   if(messageEndRef?.current && messages){
//     messageEndRef?.current.scrollIntoView({behavior:"smooth"})
//   }
// },[messages])

console.log("messages :",messages);

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Array.isArray(messages) &&
          messages.map((message) => (
              <div
               key={message._id}
                className={`chat ${
                  message?.senderId === authUser?.id ? "chat-end" : "chat-start"
                }`}
                ref={messageEndRef}
              >
                <div className="chat-image avatar">
                  <div className="size-10 rounded-full">
                    <img
                      alt="User Avatar"
                      src={selectedUser?.image || "/default-avatar.png"}
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {selectedUser?.name}{" "}
                  <time className="text-xs opacity-50">
                    {moment(message?.createdAt).format("LT")}
                  </time>
                </div>
                <div className="chat-bubble">{message?.text}</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
          ))}
      </div>

      <MessageInput />
    </div>
  );
}

export default Chat;