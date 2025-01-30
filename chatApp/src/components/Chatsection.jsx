import React, { useState, useEffect } from "react";
import message_Image from "../assets/message_send_button.png";
import { useForm } from "react-hook-form";
import { FcCallback } from "react-icons/fc";
import { FcVideoCall } from "react-icons/fc";
import { SlOptionsVertical } from "react-icons/sl";

import { PRIMARY_URL, WEBSOCKETS_URL } from "../PrimaryUrl";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../slices/loginSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Chatsection = () => {
  const [message, setMessage] = useState([]);
  const [registeredUser, setRegisteredUser] = useState([]);
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
    const message = data.message.trim();

    if (message) {
      const newMessage = { type: "sent", content: message };
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
    } else {
      return;
    }
  }

  async function userNames() {
    try {
      const response = await axios.get(`${PRIMARY_URL}/allRegisteredUser`);

      setRegisteredUser(response?.data?.data);
      if (!response) {
        console.log("response was not fetched");
      }
      console.log("response of registed user ", response);
    } catch (error) {
      console.log("error in registered User", error);
    }
  }
  useEffect(() => {
    userNames();
  }, []);

  useEffect(() => {
    const webSocket = new WebSocket(`${WEBSOCKETS_URL}?token=${token}`);

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
    <div className="w-full pt-5 h-full">
      <button
        onClick={handleLogout}
        className="font-bold text-white text-right"
      >
        Logout
      </button>
      <div className="flex w-full pt-5 h-[80%] bg-blue-200 gap-5 p-4  rounded-lg ">
        <div className="w-[30%] border-black border rounded-lg">
          <h1 className="text-center font-serif font-bold text-xl p-3">Registered Users</h1>
          <div className="flex flex-col gap-3 p-2">
            {registeredUser.map((data, index) => {
              return <div className="flex items-center justify-center border p-2" key={index}>{data.username}</div>;
            })} 
          </div>
        </div>

        {/* grid grid-rows-[auto_1fr_auto] */}
        <div className="w-[60%] h-full flex flex-col  gap-4  border rounded-lg border-black p-3">
          <div className="flex flex-col gap-3">
            {/* {/ Header Section /} */}
            <div className="flex items-center justify-between w-full p-3">
              {/* {/ Profile section /} */}
              <div className="flex items-center gap-2">
                <div className="rounded-full w-[40px] h-[40px] flex items-center justify-center bg-gray-500">
                  <img src="" alt="" />
                </div>
                <div className="font-bold text-black text-lg font-serif">
                  Krishna
                </div>
              </div>

              {/* {/ Icons section /} */}
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

            {/* {/ Divider /} */}
            <div className="w-full h-[1px] bg-black"></div>
          </div>

          {/* {/ Messages Container /} */}
          <div className="overflow-y-auto p-4 h-full rounded-lg ">
            <div className="flex flex-col gap-4">
              {message.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[30%] p-3 rounded-lg text-sm ${
                    msg.type === "sent"
                      ? "bg-blue-500 text-white ml-auto rounded-br-none"
                      : "bg-gray-200 text-black rounded-bl-none"
                  }`}
                >
                  <p className="font-bold font-serif">{msg.content}</p>
                  <span className="text-xs text-white mt-1 block text-right">
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* {/ Input Form /} */}
          <form
            onSubmit={handleSubmit(sendMessage)}
            className="flex items-center gap-3  w-full p-3"
          >
            <input
              name="message"
              className="border border-black rounded-md p-2 flex-grow"
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
