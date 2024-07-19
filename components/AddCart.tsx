"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { RiShoppingBag4Fill } from "react-icons/ri";

interface AddCartProps {
  productId?: string;
}

const AddCart: React.FC<AddCartProps> = ({ productId }) => {
  const { data: session } = useSession();
  const id = session?.user.id;
  const router = useRouter();

  const handleCart = async () => {
    if (session?.user) {
      try {
        const response = await axios
          .post("/api/cart", {
            productId: productId,
            userId: id,
          })
          .then((response) => {
            router.push("/cart");
            router.refresh();
            console.log(response.data);
          });
      } catch (error) {
        console.log("cart error", error);
      }
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div
      onClick={handleCart}
      className="flex items-center space-x-4 bg-black text-white px-6 p-2 rounded-full cursor-pointer transition hover:bg-gray-600"
    >
      <span>
        <RiShoppingBag4Fill size={24} />
      </span>
      <span className="text-sm">장바구니 담기</span>
    </div>
  );
};

export default AddCart;
