import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const { star, comment, productId, userId } = body;

    const review = await prisma.review.create({
      data: {
        rating: star,
        comment: comment,
        productId: productId,
        userId: userId,
      },
    });
    return NextResponse.json(review);
  } catch (error) {
    console.log(error, "REVIEW_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
};
