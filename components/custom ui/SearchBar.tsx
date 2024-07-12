import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchBar = () => {
  return (
    <div className="flex items-center bg-gray-100 p-2 rounded-full">
      <button>
        <IoSearchOutline size={20} className="opacity-50" />
      </button>
      <input
        type="text"
        className="outline-none bg-transparent ml-2 placeholder:font-light placeholder:text-gary-600 text-[15px]"
        placeholder="제품 검색"
        autoComplete="false"
      />
    </div>
  );
};

export default SearchBar;
