import React, { useState, useEffect, useDeferredValue } from "react";
import message_Image from "../assets/message_send_button.png";
import { useForm } from "react-hook-form";

import { WEBSOCKETS_URL } from "../PrimaryUrl";

export const Chatsection = () => {
  const [message, setMessage] = useState([]);
  const { register, handleSubmit } = useForm();
  const [ws, setWs] = useState(null);
  const [value, setValue] = useState("");

  async function handleMessage(data) {
    console.log("data", data);
    setMessage((prev) => {
      return [...prev, data?.message];
    });
  }

  useEffect(() => {
    const webSocket = new WebSocket(WEBSOCKETS_URL);
    setWs(webSocket);
    webSocket.onmessage = (event) => {
      setMessage((prevMessages) => [...prevMessages, event.data]);
    };

    console.log("message", message);
  }, [message]);

  return (
    <div className="flex w-full pt-5 h-[70%] bg-blue-200 ">
      <div className="w-[30%] border-black border">Contacts</div>

      <div className="w-[70%] flex items-start flex-col border border-black justify-between ">
        <div className="flex items-start flex-col gap-3 p-3">
          <h1>Messages</h1>

          <div className="flex flex-col gap-2">
            {message.map((msg, index) => {
              return <p key={index}>{msg}</p>;
            })}
          </div>
        </div>
        <div className="flex items-start justify-start gap-3 w-full p-3">
          <input
            name="message"
            className="border border-black rounded-md p-2 w-[70%]"
            type="text"
            placeholder="Enter Your Message Here..."
            {...register("message")}
          />

          <button onClick={handleSubmit(handleMessage)}>
            <img src={message_Image} className="h-[40px] w-[40px]" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};
