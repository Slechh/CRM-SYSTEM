import { Icon } from "./Icon";
export function Header({ currentUser }) {
  return (
    <header className="flex h-12">
      <div className="w-[412px] bg-bgBlock flex py-3 gap-3 rounded-2xl items-center truncate max-w-[412px]">
        <button className="ml-5">
          <Icon id="search" className="w-6 h-6" />
        </button>
        <input
          type="search"
          name="asdad"
          placeholder="Search"
          className="bg-transparent w-full outline-none mr-4"
        />
      </div>
      <div className="flex gap-3 items-center bg-bgBlock rounded-2xl py-2 px-3 ml-auto">
        <img
          src="/images/photo.png"
          alt="userAvatar"
          className="w-[30px] h-[30px]"
        />
        <h2 className="font-bold text-userText truncate max-w-[180px]">
          {currentUser?.username}
        </h2>
        <button>
          <Icon id="arrow-down" className="w-3 h-3 text-userText" />
        </button>
      </div>
    </header>
  );
}
