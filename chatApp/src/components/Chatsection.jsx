import React, { useState, useEffect, useDeferredValue } from "react";
import message_Image from "../assets/message_send_button.png";
import { useForm } from "react-hook-form";

import { WEBSOCKETS_URL } from "../PrimaryUrl";

export const Chatsection = () => {
  const [message, setMessage] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [ws, setWs] = useState(null);

  async function sendMessage(data) {
    console.log("data", data);

    const newMessage = { type: "sent", content: data.message };
    setMessage((prev) => {
      return [...prev, newMessage];
    });

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(data.message); // Send the value in the input
      reset();
    } else {
      console.error("WebSocket is not open");
      reset();
    }
  }

  useEffect(() => {
    const webSocket = new WebSocket(WEBSOCKETS_URL);

    webSocket.onopen = () => {
      console.log("WebSocket connection established");
    };

    webSocket.onmessage = async (event) => {
      try {
        let receivedMessage = event.data;
        console.log("event.data", event.data);

        // If data is a Blob, convert it to text
        if (event.data instanceof Blob) {
          receivedMessage = await event.data.text();
        }

        const newMessage = { type: "received", content: receivedMessage }; // Tag as received
        setMessage((prevMessages) => [...prevMessages, newMessage]);
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };
    setWs(webSocket);

    return () => webSocket.close();
  }, [message]);

  return (
    <div className="flex w-full pt-5 h-[70%] bg-blue-200 ">
      <div className="w-[30%] border-black border">Contacts</div>

      <div className="w-[70%] flex items-start flex-col border border-black justify-between ">
        <div className="flex items-start flex-col gap-3 p-3 w-[100%] overflow-visible">
          <h1 >Messages</h1>

          <div className="flex flex-col gap-4 w-[100%] overflow-auto">
            {message.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[70%] p-3 rounded-lg text-sm ${
                  msg.type === "sent"
                    ? "bg-blue-500 text-white self-end rounded-br-none" // Sent message
                    : "bg-gray-200 text-black self-start rounded-bl-none" // Received message
                }`}
              >
                <p className="font-bold font-serif">{msg.content}</p>
                <span className="text-xs text-white mt-1 block text-right">
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  {/* Timestamp */}
                </span>
              </div>
            ))}
          </div>
        </div>
        <form
          onSubmit={handleSubmit(sendMessage)}
          className="flex items-start justify-start gap-3 w-full p-3"
        >
          <input
            name="message"
            className="border border-black rounded-md p-2 w-[70%]"
            type="text"
            placeholder="Enter Your Message Here..."
            {...register("message")}
          />

          <button>
            <img src={message_Image} className="h-[40px] w-[40px]" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};
