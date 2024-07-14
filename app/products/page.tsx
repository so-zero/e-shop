import React from "react";
import Navbar from "@/components/Navbar";
import Item from "@/components/Item";
const page = () => {
  return (
    <div className="px-5 max-w-[1280px] mx-auto">
      <Navbar />
      <div className="mt-10 mb-3">
        <div className="flex justify-center items-center">
          <div className="px-3 md:px-20">
            <Item />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
