import React, { useState, useEffect } from "react";
import Message1 from "./message1";
import Message2 from "./message2";
import axios from "axios";

function MessagesBox({ idSender, idChat, currentChat }) {
  const [message, setMessage] = useState("");
  const [previousMessages, setPreviousMessages] = useState([]);
  const [chatWanted, setChatWanted] = useState([]);


  /**
   * @description get all previous messages on mount
   */
  useEffect(() => { 
    axios
      .get("http://localhost:4000/message/getAllMessages")
      .then((response) => setPreviousMessages(response.data.result))
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  /**
   * @desc this function for send a new message
   */
  const sendMessage = async () => {
    if (!message) {
      return ;
    }

    try {
      await axios.post("http://localhost:4000/message/sendMessage", {
        chatId: idChat,
        senderId: idSender,
        message: message,
      });

      
      
      await axios.put(`http://localhost:4000/chats/updateChat/${idChat}`, {
        lastMessage : message 
      })
      
      await axios
      .get("http://localhost:4000/message/getAllMessages")
      .then((response) => setPreviousMessages(response.data.result))
      setMessage("");

    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  
  useEffect(() => {
    if (previousMessages || idChat) {
      const msgWanted = previousMessages.filter((msg) => msg.chatId === idChat);
      setChatWanted(msgWanted);
    } 
  }, [previousMessages,idChat])

  
  useEffect(() => {
    const scrollElement = document.getElementById("scroll");
    if (scrollElement && chatWanted.length > 0) {
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [chatWanted]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      {idSender && idChat ? (
        <>
          <div className="mb-3 bg-white rounded-md shadow-md p-4 text-center">
            <b>{currentChat.chatName}</b>
          </div>
          <div id="scroll" className="flex flex-col flex-grow space-y-4 overflow-y-auto bg-white rounded-md shadow-md p-4">
            {chatWanted.map((msg, index) => (
              msg.senderId === idSender ? (
                <Message1 createdAt={msg.createdAt} key={index} message={msg.message} />
              ) : (
                <Message2 createdAt={msg.createdAt} key={index} message={msg.message} />
              )
            ))}
          </div>
          <div className="flex mt-4">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow p-3 focus rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>

            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500">Start a chat</div>
      )}
    </div>
  );
}

export default MessagesBox;
