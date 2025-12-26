import { useState } from "react";
import { Icon } from "./Icon";
import { Timer } from "./timer";

export function Header({ currentUser }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex h-12">
      <div className="w-[200px] bg-bgNavBlock px-6 shadow-lg flex py-3 gap-3 rounded-2xl justify-center items-center truncate max-w-[412px]">
        <Timer />
      </div>

      <div className="relative ml-auto">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex gap-3 items-center bg-bgBlock rounded-2xl py-2 px-3 hover:opacity-90 transition-opacity"
        >
          <img
            src="/images/photo.png"
            alt="userAvatar"
            className="w-[30px] h-[30px]"
          />
          <h2 className="font-bold text-userText truncate max-w-[180px]">
            {currentUser?.username}
          </h2>
          <Icon
            id="arrow-down"
            className={`w-3 h-3 text-userText transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-[180px] text-black bg-bgApp rounded-lg overflow-hidden z-50 shadow-xl">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full px-4 py-2 text-left  hover:bg-slate-400 transition-colors"
            >
              Profile
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full px-4 py-2 text-left  hover:bg-slate-400 transition-colors"
            >
              More
            </button>
          </div>
        )}  
      </div>
    </header>
  );
}