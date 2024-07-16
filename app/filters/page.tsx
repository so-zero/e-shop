"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Filter from "./Filter";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [allColorValues, setAllColorValues] = useState<string[]>([]);
  const [selectedColorValues, setSelectedColorValues] = useState<string[]>([]);
  const [price, setPrice] = useState({
    min: 0,
    max: 10,
  });
  const [response, setResponse] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get("/api/filterproduct", {
            params: {
              categories: selectedCategories,
              size: selectedSize,
              price: {
                min: price.min,
                max: price.max,
              },
              colors: selectedColorValues,
            },
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log("response", response.data);
            setResponse(response.data);
          });
      } catch (error) {
        console.log("filter error", error);
      }
    };
    fetchData();
  }, [selectedCategories, selectedSize, selectedColorValues, price]);

  return (
    <div className="px-5 max-w-[1280px] mx-auto">
      <div>
        <Navbar />
      </div>
      <div className="flex mt-10 border-t-[0.5px] border-r-[0.5px] sm:overflow-x-auto">
        <div>
          <Filter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            allColorValues={allColorValues}
            setAllColorValues={setAllColorValues}
            selectedColorValues={selectedColorValues}
            setSelectedColorValues={setSelectedColorValues}
            price={price}
            setPrice={setPrice}
          />
        </div>
        <div className="px-10">
          <h1 className="py-3 text-xl font-semibold">필터 상품</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 mt-5">
            {response.map((product: any) => (
              <div key={product.id}>
                <Link href={`/dashboard/${product.id}`}>
                  <div className="relative rounded-md">
                    <Image
                      src={product?.images.split(",")[0]}
                      alt={product?.title}
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
      </div>
    </div>
  );
};

export default Page;
