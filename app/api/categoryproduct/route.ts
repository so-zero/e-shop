import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const searchParams = new URLSearchParams(request.url.split("?")[1]);

    const categories = searchParams.getAll("categories[]");
    const styles = searchParams.getAll("styles[]");
    const brands = searchParams.getAll("brands[]");

    const products = await prisma.product.findMany({
      where: {
        OR: [
          ...categories.map((category) => ({
            category: { contains: category },
          })),
          ...styles.map((style) => ({ style: { contains: style } })),
          ...brands.map((brand) => ({ brand: { contains: brand } })),
        ],
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log(error, "CATEGORY_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
};
