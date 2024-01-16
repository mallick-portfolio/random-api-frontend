import { avaterName } from "@/app/utils/helpers";
import React from "react";

const Avater = ({ image = "", name = "Anonimus user", css }) => {
  return (
    <div>
      {image ? (
        <div className="w-16 rounded-full">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      ) : (
        <div className="avatar  placeholder">
          <div
            className={`bg-first ${
              css ? css : "w-12"
            } text-neutral-content rounded-full`}
          >
            <span className="text-xl">{avaterName(name)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avater;
