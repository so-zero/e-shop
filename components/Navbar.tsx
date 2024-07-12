"use client";

import React, { useState } from "react";
import Link from "next/link";
import SearchBar from "./custom ui/SearchBar";
import { LuUser2, LuShoppingCart, LuAlignJustify } from "react-icons/lu";

const Navbar = () => {
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(false);

  return (
    <div>
      <div className="flex items-center justify-between py-4 relative">
        <div className="flex items-center md:space-x-10 lg:space-x-20">
          <div className="font-semibold text-2xl">
            <Link href="/">E-shop</Link>
          </div>
          <nav className="max-md:hidden">
            <ul className="flex items-center space-x-7 lg:space-x-10 opacity-70 text-[15px]">
              <li>
                <Link href="/">홈</Link>
              </li>
              <li>
                <Link href="/collections">컬렉션</Link>
              </li>
              <li>
                <Link href="/products">프로덕트</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className=" max-md:hidden">
            <SearchBar />
          </div>
          <div className="relative cursor-pointer bg-gray-100 p-2 rounded-full">
            <Link href="/cart">
              <LuShoppingCart size={20} />
            </Link>
          </div>
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="relative cursor-pointer bg-gray-100 p-2 rounded-full"
          >
            <Link href="/login">
              <LuUser2 size={20} />
            </Link>
          </div>
          <div
            onClick={() => setShowNav(!showNav)}
            className="p-[9px] bg-gray-100 rounded-full md:hidden cursor-pointer"
          >
            <LuAlignJustify
              size={20}
              className={`transition ease-in duration-150 ${
                showNav ? "rotate-180" : "0"
              }`}
            />
          </div>
        </div>
      </div>
      <div
        className={`md:hidden ${
          showNav ? "pb-4 px-5" : "h-0 invisible opacity-0"
        }`}
      >
        <ul className="flex flex-col justify-center items-center text-[15px] opacity-75 px-2 gap-5 font-semibold mt-4">
          <li>
            <Link href="/collections">컬렉션</Link>
          </li>
          <li>
            <Link href="/products">프로덕트</Link>
          </li>
        </ul>
        <div className="flex items-center bg-gary-100 p-2 rounded-md my-4 py-3 justify-center">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
