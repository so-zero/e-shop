import React from "react";
import prisma from "@/libs/prismadb";
import Link from "next/link";
import Image from "next/image";

const Item = async () => {
  const products = await prisma.product.findMany();
  // console.log("products", products);

  if (products.length === 0) {
    return <div className="mt-10">상품이 없습니다.</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="py-3 text-xl font-semibold">전체 상품</h1>
        <Link href="/filters">
          <button className="bg-black text-white p-2 rounded-lg transition hover:bg-gray-600">
            필터
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-20">
        {products.map((product) => (
          <div key={product.id}>
            <Link href={`/dashboard/${product.id}`}>
              <div className="relative rounded-md">
                <Image
                  src={product.images.split(",")[0]}
                  alt={product.title}
                  width={250}
                  height={300}
                  className="w-[250px] h-[300px] object-cover object-top rounded-md"
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <h1 className="text-[14px] font-medium max-w-[150px] whitespace-nowrap overflow-hidden">
                    {product.title}
                  </h1>
                  <p className="text-[13px] opacity-60">{product.brand}</p>
                </div>
                <span className="px-2 font-medium bg-gray-100 rounded-md">
                  {product.price}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Item;
