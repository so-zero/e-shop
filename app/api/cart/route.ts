import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { productId, userId } = body;

    const existingCartItem = await prisma.cart.findFirst({
      where: {
        productId,
        userId,
      },
    });
    console.log(existingCartItem);

    if (existingCartItem) {
      await prisma.cart.delete({
        where: {
          id: existingCartItem.id,
        },
      });
    }
    const product = await prisma.cart.create({
      data: {
        productId,
        userId,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log(error, "CART_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
};
