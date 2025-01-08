import React from "react";
import message_Image from '../assets/message_send_button.png'
export const Chatsection = () => {
  return (
    <div className="flex  w-full mt-5 h-full ">
      <div className="w-[50%]">Contacts</div>

      <div className="w-[50%] flex items-start flex-col gap-2">
        <p>Messages</p>
        <div className="flex items-center justify-center gap-3">
          <input
            className="border border-black rounded-md p-2 w-[full]"
            type="text"
            placeholder="Enter Your Message Here..."
          />

          <button><img src={message_Image} className="h-[40px] w-[40px]" alt="" /></button>
        </div>
      </div>
    </div>
  );
};
