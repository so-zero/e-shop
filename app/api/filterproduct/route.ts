import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const searchParams = new URLSearchParams(request.url.split("?")[1]);

    const categories = searchParams.getAll("categories[]");
    const colors = searchParams.getAll("colors[]");
    const sizes = searchParams.getAll("size[]");
    const minPrice = parseInt(searchParams.get("price[min]") || "0");
    const maxPrice = parseInt(searchParams.get("price[max]") || "1000000");

    const products = await prisma.product.findMany({
      where: {
        OR: [
          ...categories.map((category) => ({
            category: { contains: category },
          })),
          ...sizes.map((size) => ({ size: { contains: size } })),
          ...colors.map((color) => ({ color: { contains: color } })),
          { price: { gte: minPrice, lte: maxPrice } },
        ],
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log(error, "FILTER_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
};
