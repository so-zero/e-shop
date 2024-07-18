"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Cate from "./custom ui/Cate";
import Link from "next/link";
import Image from "next/image";

const Product = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [response, setResponse] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get("/api/categoryproduct", {
            params: {
              categories: selectedCategories,
              styles: selectedStyles,
              Brands: selectedBrands,
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
  }, [selectedCategories]);

  return (
    <div className="flex flex-col mt-10 sm:overflow-x-auto">
      <div>
        <Cate
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </div>
      <div className="px-10">
        <div className="flex flex-col md:flex-row items-center gap-5 mt-5 ">
          {response.map((product: any) => (
            <div key={product.id}>
              <Link href={`/dashboard/${product.id}`}>
                <div className="relative rounded-md w-[250px] h-[300px]">
                  <Image
                    src={product?.images.split(",")[0]}
                    alt={product?.title}
                    width={250}
                    height={300}
                    className="object-cover object-top rounded-md"
                  />
                  <div className="flex justify-between items-center mt-4">
                    <h1 className="text-[14px] font-semibold">
                      {product.title}
                    </h1>
                    <span className="px-2 font-medium bg-gray-100 rounded-md">
                      {product.price}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
