import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Navbar from "@/components/Navbar";
import AllCartProduct from "@/components/AllCartProduct";

const page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="max-w-[1280px] mx-auto px-5">
        <Navbar />
        <AllCartProduct userId={session?.user?.id} />
        <span className="mt-10 mb-10"></span>
      </div>
    </>
  );
};

export default page;
