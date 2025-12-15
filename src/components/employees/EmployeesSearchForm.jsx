import { Icon } from "../Icon";
import { useState } from "react";

export function EmployeesSearchForm({ onSearch }) {
  const [inputValue, setInputValue] = useState("");
  const handleClick = () => {
    onSearch(inputValue);
  };
  return (
    <div className="w-full bg-bgBlock px-5 py-3 rounded-2xl">
      <div className="flex items-center">
        <input
          type="text"
          value={inputValue}
          placeholder="Search"
          className="bg-transparent w-full outline-none mr-4"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="ml-5" onClick={handleClick}>
          <Icon id="search" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
