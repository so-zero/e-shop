import React from "react";
import prisma from "@/libs/prismadb";
import Edit from "../components/Edit";

const EditProduct = async ({ params }: { params: { slug: string } }) => {
  const productId = params.slug;

  if (!productId) {
    return (
      <div className="flex justify-center mt-10">
        상품 정보를 찾을 수 없습니다.
      </div>
    );
  }

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) {
      return (
        <div className="flex justify-center mt-10">
          상품을 찾을 수 없습니다.
        </div>
      );
    }

    return (
      <div>
        <Edit {...product} />
      </div>
    );
  } catch (error) {
    console.log("edit product error", error);
  }

  return <div>page</div>;
};

export default EditProduct;
