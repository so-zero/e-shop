"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ReactStars from "react-rating-star-with-type";
import AddCart from "@/components/AddCart";
import Benefits from "@/components/custom ui/Benefits";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";

interface ProductInfoProps {
  id: string;
  title: string;
  description: string;
  category: string;
  size: string;
  color: string;
  price: number;
  brand: string;
  style: string;
  inventory: number;
  images: string;
  userId: string;
  rating: number;
  comments: number;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  id,
  title,
  description,
  category,
  size,
  color,
  price,
  brand,
  style,
  inventory,
  images,
  userId,
  rating,
  comments,
}) => {
  const colors = color.split(",");
  const sizes = size.split(",");
  const { data: session } = useSession();
  const currentUserId = session?.user.id;
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const handleSelectSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes((prevSize: string[]) =>
        prevSize.filter((item) => item !== size)
      );
    } else {
      setSelectedSizes((prevSize: string[]) => [...prevSize, size]);
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">{title}</h1>
        <h3 className="text-sm text-gray-500">{`${style}>${category}`}</h3>
        <h3 className="text-sm text-gray-500">{brand}</h3>
      </div>
      <div className="flex items-center space-x-12 mt-4">
        <ReactStars value={rating} size={20} />
        <span className="flex items-start space-x-3">
          <BiCommentDetail size={22} />
          <span className="opacity-70 text-sm">{comments}개의 리뷰</span>
        </span>
      </div>
      <h3 className="font-medium mt-8 mb-3 text-[14px]">사이즈</h3>
      <ul className="flex space-x-5">
        {sizes.map((size, index) => (
          <li
            key={index}
            className={`p-1 px-2 border-[1px] rounded-md cursor-pointer inline-block text-center ${
              selectedSizes.includes(size)
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
            onClick={() => handleSelectSize(size)}
          >
            {size}
          </li>
        ))}
      </ul>
      <h3 className="font-medium mt-8 mb-3 text-[14px]">색상</h3>
      {colors.map((color, index) => (
        <div
          key={index}
          className="relative w-[35px] h-[35px] border-[1px] border-gray-400 m-1"
          style={{
            borderRadius: "100%",
            backgroundColor: color,
            display: "inline-block",
          }}
        >
          <span
            className="w-[30px] h-[30px] rounded-full flex top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute border-[1px]"
            style={{ backgroundColor: color }}
          ></span>
        </div>
      ))}
      <h3 className="font-medium mt-8 mb-3 text-[14px]">가격</h3>
      <h1 className="text-lg font-semibold">{price}원</h1>
      <div className="flex items-center mt-7 space-x-10">
        <AddCart productId={id} />
      </div>
      <div>
        <Benefits />
      </div>
      {currentUserId === userId && (
        <Link href={`/editproduct/${id}`}>
          <span className="absolute top-0 right-0 p-2 text-gray-600 cursor-pointer">
            <AiOutlineEdit size={24} />
          </span>
        </Link>
      )}
    </div>
  );
};

export default ProductInfo;
