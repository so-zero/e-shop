"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";

interface DeleteCartProps {
  productId?: string;
  userId?: string;
}

const DeleteCart: React.FC<DeleteCartProps> = ({ productId, userId }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await axios.delete("/api/cart", {
        data: {
          productId: productId,
          userId: userId,
        },
      });
      router.refresh();
    } catch (error) {
      console.log("cart delete error", error);
    }
  };
  return (
    <div className="cursor-pointer" onClick={handleDelete}>
      <RiDeleteBin5Line size={20} className="hover:text-red-500 transition" />
    </div>
  );
};

export default DeleteCart;
