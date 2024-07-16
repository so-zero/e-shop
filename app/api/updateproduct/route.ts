import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();

    const {
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
    } = body;

    const updateProduct = await prisma.product.update({
      where: {
        id: id,
      },
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
    return NextResponse.json(updateProduct);
  } catch (error) {
    console.log(error, "UPDATE_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
};
