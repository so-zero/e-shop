"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const AuthForm = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const Register = () => {
    const data = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    axios
      .post("/api/register", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        router.push("/sign-in");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="p-10 rounded-md shadow-md flex flex-col">
        <h1 className="text-xl font-semibold mb-6 text-center">회원가입</h1>
        <label htmlFor="name" className="text-sm">
          이름
        </label>
        <input
          type="text"
          id="name"
          placeholder="이름을 입력하세요."
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="mt-1 p-2 border-gray-300 border-[1px] rounded-md w-[300px] mb-4 focus:outline-none focus:border-gray-600 text-black placeholder:text-sm"
        />
        <label htmlFor="email" className="text-sm">
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
          onClick={Register}
          className="p-2 bg-black text-white mt-4 mb-4 rounded-md hover:bg-gray-600 transition"
        >
          가입하기
        </button>
        <Link
          href="sign-in"
          className="text-sm text-center mt-3 text-neutral-600 hover:underline transition"
        >
          로그인
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;
