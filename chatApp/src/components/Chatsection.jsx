import React, { useState, useEffect, useDeferredValue } from "react";
import message_Image from "../assets/message_send_button.png";
import { useForm } from "react-hook-form";
import { FcCallback } from "react-icons/fc";
import { FcVideoCall } from "react-icons/fc";
import { SlOptionsVertical } from "react-icons/sl";

import { WEBSOCKETS_URL } from "../PrimaryUrl";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../slices/loginSlice";
import { useNavigate } from "react-router-dom";

export const Chatsection = () => {
  const [message, setMessage] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [ws, setWs] = useState(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.loginReducers);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearToken(null));
    navigate("/login");
  };

  async function sendMessage(data) {
    console.log("data", data);

    const newMessage = { type: "sent", content: data.message.trim() };
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
    <div className="w-full p-5 h-screen ">
      <button
        onClick={handleLogout}
        className="font-bold text-white text-right"
      >
        Logout
      </button>
      <div className="flex w-full bg-blue-200 gap-5 p-4 ">
        <div className="w-[30%] border-black border">Contacts</div>

        <div className="w-[60%] h-full flex flex-col flex-grow border rounded-lg  border-black justify-between p-3 ">

          <div className="flex items-start flex-grow flex-col gap-3 p-3 w-[100%] h-full ">
            {/* header */}
            <div className="flex items-center justify-between w-full ">
              {/* profile photo and name */}
              <div className="flex items-center gap-2">
                <div className="rounded-full w-[40px] h-[40px] flex items-center justify-center bg-gray-500">
                  <img src="" alt="" />
                </div>

                <div className="font-bold text-black text-lg font-serif">
                  Krishna
                </div>
              </div>

              {/* calling and options parts */}
              <div className="flex items-center gap-4">
                <div>
                  <FcCallback className="text-4xl" />
                </div>
                <div>
                  <FcVideoCall className="text-4xl text-blue-500" />
                </div>
                <div>
                  <SlOptionsVertical className="text-4xl text-blue-500" />
                </div>
              </div>
            </div>

            {/* this is for lining */}
            <div className="w-full h-[1px]  bg-black"></div>

            <div className="w-full h-full flex ">
              {/* message-box */}
              <div className="flex-grow flex flex-col overflow-y-auto p-4 gap-4 max-h-[70%] ">
                {message.map((msg, index) => (
                  <div
                    key={index}
                    className={`max-w-[30%] p-3 rounded-lg text-sm ${
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
    </div>
  );
};
