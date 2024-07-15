import React from "react";
import prisma from "@/libs/prismadb";
import Link from "next/link";
import ImageCard from "@/app/dashboard/components/ImageCard";
import ProductInfo from "../components/ProductInfo";
import Image from "next/image";
import { getServerSession } from "next-auth";

export default async function Page({ params }: { params: { slug: string } }) {
  const productId = params.slug;
  const session = await getServerSession();
  const currentUserId = session?.user.id;
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  const urlString = product?.images;
  return (
    <div className="max-w-[1280px] mx-auto px-5 py-5">
      <div className="font-semibold text-2xl mb-10">
        <Link href="/">E-shop</Link>
      </div>
      {product && (
        <div className="flex flex-col mx-auto mt-10 md:grid md:grid-cols-2 md:gap-14">
          {urlString && <ImageCard imageUrls={urlString} />}
          <ProductInfo {...product} />
        </div>
      )}
      <div className="mb-20 mt-20">
        <div className="flex items-center space-x-5 mb-10">
          <span className="w-[5px] h-[30px] bg-gray-600 rounded-full inline-block"></span>
          <span className="font-medium text-xl">상품 설명</span>
        </div>
        {product && (
          <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <div className="flex justify-start items-center gap-10 mb-5">
                <div>
                  <h3 className="font-semibold mb-1">카테고리</h3>
                  <p className="text-sm text-gray-600">{product.category}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">스타일</h3>
                  <p className="text-sm text-gray-600">{product.style}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">브랜드</h3>
                  <p className="text-sm text-gray-600">{product.brand}</p>
                </div>
              </div>
              <div
                style={{ borderColor: `{${product.color.split(",").pop()}}` }}
                className={`leading-6 text-sm text-gray-700 h-[200px] border-[1px] rounded-md p-4 overflow-scroll scrollbar-hide`}
                dangerouslySetInnerHTML={{ __html: product?.description }}
              ></div>
            </div>
            <div className="relative flex justify-center md:justify-end items-center">
              <Image
                src={product.images.split(",").pop()}
                width={300}
                height={300}
                alt={product.title}
                className="max-h-[300px] w-10/12 rounded-lg object-cover object-top"
              />
              <span className="text-sm absolute bottom-2 right-2 text-white font-medium">
                {product.title}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
