import React from "react";
import { FaRegCreditCard } from "react-icons/fa6";
import { MdOutlineCardGiftcard } from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";
import { LuTruck } from "react-icons/lu";

const Benefits = () => {
  return (
    <div className="grid grid-cols-2 gap-5 opacity-70 mt-8">
      <span className="text-sm flex items-center space-x-4">
        <span className="p-2 bg-gray-100 rounded-full">
          <FaRegCreditCard size={24} />
        </span>
        <p>무이자 할부</p>
      </span>
      <span className="text-sm flex items-center space-x-4">
        <span className="p-2 bg-gray-100 rounded-full">
          <MdOutlineCardGiftcard size={24} />
        </span>
        <p>선물포장 무료</p>
      </span>
      <span className="text-sm flex items-center space-x-4">
        <span className="p-2 bg-gray-100 rounded-full">
          <TbPigMoney size={24} />
        </span>
        <p>포인트 적립</p>
      </span>
      <span className="text-sm flex items-center space-x-4">
        <span className="p-2 bg-gray-100 rounded-full">
          <LuTruck size={24} />
        </span>
        <p>무료배송</p>
      </span>
    </div>
  );
};

export default Benefits;
