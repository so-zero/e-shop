import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const {
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
    } = body;

    const product = await prisma.product.create({
      data: {
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
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log(error, "ADD PRODUCT_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
};
