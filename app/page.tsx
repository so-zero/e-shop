import React from "react";
import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/libs/session";
import Product from "@/components/Product";
import banner_Img from "/public/banner.jpg";
import Image from "next/image";
import Brand from "@/components/custom ui/Brand";
import Link from "next/link";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="px-5 max-w-[1280px] mx-auto">
      <Navbar />
      <div className="mt-5 md:mt-20 relative flex justify-center md:justify-end items-center">
        <Image
          src={banner_Img}
          width={1200}
          height={300}
          alt="banner"
          className="object-cover object-center overflow-hidden h-[200px] md:h-[300px] mx-auto"
        />
        <p className="text-lg absolute bottom-2 right-3 md:right-10 text-white font-semibold">
          E-shop
          <span className="block">Fashion Trend</span>
        </p>
      </div>
      <div className="mt-14">
        <Product />
      </div>
      <div className="mt-14">
        <Brand />
      </div>
      <div className="mt-14 px-10 flex flex-col gap-6 mb-8">
        <h1 className="font-semibold text-xl">🔥HOT 컬렉션</h1>
        <Image
          src={banner_Img}
          width={1200}
          height={300}
          alt="banner"
          className="object-cover object-bottom overflow-hidden h-[200px] md:h-[300px] mx-auto"
        />
        <Link
          href="/collections"
          className="text-right text-lg font-semibold transition hover:underline"
        >
          컬렉션 더보기
        </Link>
      </div>
    </div>
  );
}
