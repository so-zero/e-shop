import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const allColors = await prisma.product.findMany({
      select: {
        color: true,
      },
    });
    return NextResponse.json(allColors);
  } catch (error) {
    console.log(error, "COLOR_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
};
