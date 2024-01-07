import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowChatBox } from "@/app/store/reducer/modalSlice";

const WidgetToggler = () => {
  const dispatch = useDispatch();
  const { showChatBox } = useSelector((state) => state.modal);

  return (
    <div
      className={`fixed right-3 bottom-4 transition-opacity duration-300 ${
        showChatBox ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div
        onClick={() => dispatch(setShowChatBox(true))}
        className="chat chat-end cursor-pointer w-[200px] opacity-100 hover:opacity-80 transition-opacity duration-300"
      >
        <div className="chat-bubble bg-gradient-to-r from-pink-400 to-pink-600">
          Start chat
        </div>
      </div>
    </div>
  );
};

export default WidgetToggler;
