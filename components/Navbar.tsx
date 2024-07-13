"use client";

import React, { useState } from "react";
import Link from "next/link";
import SearchBar from "./custom ui/SearchBar";
import { LuUser2, LuShoppingCart, LuAlignJustify } from "react-icons/lu";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(false);

  const SignOut = () => {
    if (session && session.user) {
      return (
        <ul className="py-5 px-1 text-neutral-600">
          <li className="hover:bg-gray-100 hover:text-neutral-900 px-5 py-2 cursor-pointer transition">
            {session.user.name}님
          </li>
          <li className="whitespace-nowrap hover:bg-gray-100 hover:text-neutral-900 px-5 py-2 cursor-pointer transition">
            <Link href="addproduct">상품추가</Link>
          </li>
          <li
            onClick={() => signOut()}
            className="whitespace-nowrap hover:bg-gray-100 hover:text-neutral-900 px-5 py-2 cursor-pointer transition"
          >
            로그아웃
          </li>
        </ul>
      );
    }
    return (
      <ul>
        <li
          onClick={() => signIn()}
          className="whitespace-nowrap hover:bg-gray-100 hover:text-neutral-900 px-5 py-2 cursor-pointer transition"
        >
          로그인
        </li>
      </ul>
    );
  };

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
            <LuUser2 size={20} />
            <div
              className={`absolute right-0 bg-white z-10 rounded-md shadow-md ${
                showProfile ? "" : "hidden"
              }`}
            >
              <SignOut />
            </div>
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
