import React, { useState, useEffect } from "react";
import Message1 from "./message1";
import Message2 from "./message2";
import axios from "axios";
import { useRef } from "react";

function MessagesBox({ idSender, idChat, currentChat }) {
  const [message, setMessage] = useState("");
  const [previousMessages, setPreviousMessages] = useState([]);
  const [chatWanted, setChatWanted] = useState([]);

  const messagesEndRef = useRef(null);


  /**
   * @description Fetch all previous messages on mount
   */
  useEffect(() => {
    axios
      .get("http://localhost:4000/message/getAllMessages")
      .then((response) => setPreviousMessages(response.data.result))
      .catch((error) => console.error("Error fetching messages:", error));
  }, [previousMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatWanted]);


  const sendMessage = async () => {
    try {
      const result = await axios.post("http://localhost:4000/message/sendMessage", {
        chatId: idChat,
        senderId: idSender,
        message: message,
      });

      console.log(result);
      setMessage("");

      setPreviousMessages([...previousMessages, {
        chatId: idChat,
        senderId: idSender,
        message: message,
      }])

    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/message/getAllMessages")
      .then((response) => setPreviousMessages(response.data.result))
  }, [])

  useEffect(() => {
    const msgWanted = previousMessages.filter((msg) => msg.chatId === idChat);
    if (msgWanted) setChatWanted(msgWanted);
  }, [previousMessages, idChat])


  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      {idSender && idChat ? (
        <>
          <div className="mb-3 bg-white rounded-md shadow-md p-4 text-center">
            <b>{currentChat.chatName}</b>
          </div>
          <div className="flex flex-col flex-grow space-y-4 overflow-y-auto bg-white rounded-md shadow-md p-4">
            {chatWanted.map((msg, index) => (
              msg.senderId === idSender ? (
                <Message1 key={index} message={msg.message} />
              ) : (
                <Message2 key={index} message={msg.message} />
              )
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Inut area */}
          <div className="flex mt-4">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow p-3 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
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
