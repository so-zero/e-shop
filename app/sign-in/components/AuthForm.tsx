"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

const AuthForm = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const Login = () => {
    try {
      signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      console.log("logged error", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="p-10 rounded-md shadow-md flex flex-col">
        <h1 className="text-xl font-semibold mb-6 text-center">로그인</h1>
        <label htmlFor="name" className="text-sm">
          이메일
        </label>
        <input
          type="email"
          id="email"
          placeholder="이메일을 입력하세요."
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="mt-1 p-2 border-gray-300 border-[1px] rounded-md w-[300px] mb-4 focus:outline-none focus:border-gray-600 text-black placeholder:text-sm"
        />
        <label htmlFor="password" className="text-sm">
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          placeholder="비밀번호를 입력하세요."
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="mt-1 p-2 border-gray-300 border-[1px] rounded-md w-[300px] mb-4 focus:outline-none focus:border-gray-600 text-black placeholder:text-sm"
        />
        <button
          onClick={Login}
          className="p-2 bg-black text-white mt-4 mb-4 rounded-md hover:bg-gray-600 transition"
        >
          로그인
        </button>
        <Link
          href="sign-up"
          className="text-sm text-center mt-3 text-neutral-600 hover:underline transition"
        >
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;
