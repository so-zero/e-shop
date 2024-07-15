import React from "react";
import prisma from "@/libs/prismadb";
import Link from "next/link";
import Image from "next/image";
import DeleteCart from "./custom ui/DeleteCart";
import Button from "./custom ui/Button";

interface AllCartProductProps {
  userId?: string;
}

const AllCartProduct: React.FC<AllCartProductProps> = async ({ userId }) => {
  const allCartProduct = await prisma.cart.findMany({
    where: {
      userId: userId,
    },
  });

  const cartProduct = allCartProduct.map((item) =>
    prisma.product.findUnique({
      where: {
        id: item.productId,
      },
    })
  );

  const cartProducts = await Promise.all(cartProduct);

  if (cartProducts.length === 0) {
    return (
      <div className="flex justify-center mt-20">
        <h1 className="text-gray-600">장바구니에 상품이 없습니다.</h1>
      </div>
    );
  }

  const allIds = allCartProduct.map((item) => item.productId);

  return (
    <div className="mt-14">
      <h1 className="text-xl font-semibold text-center">장바구니</h1>
      {cartProducts.map((product) => (
        <div
          key={product?.id}
          className="flex items-center flex-col gap-3 md:flex-row md:justify-evenly w-8/12 mx-auto p-5 rounded-md mt-10"
        >
          <Link href={`/dashboard/${product?.id}`}>
            <div>
              <Image
                src={product?.images.split(",")[0]}
                alt={product?.title}
                width={200}
                height={200}
                className="w-[200px] h-[200px] object-cover object-top"
              />
            </div>
          </Link>
          <div>
            <h1 className="text-xl mb-3">{product?.title}</h1>
            <h2 className="text-gray-800 mb-2">가격: {product?.price}원</h2>
            <h3 className="text-sm text-gray-600 mb-2">{product?.brand}</h3>
            <DeleteCart productId={product?.id} userId={userId} />
          </div>
        </div>
      ))}
      <Button allIds={allIds} userId={userId} />
    </div>
  );
};

export default AllCartProduct;
