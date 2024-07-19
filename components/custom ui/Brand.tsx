"use client";

import React, { useEffect, useState } from "react";
import Nike from "@/public/nike.png";
import Adidas from "@/public/adidas.png";
import Newbalance from "@/public/newbalance.png";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import BrandBox from "./BrandBox";

const Brand = () => {
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
              brands: selectedBrands,
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
  }, [selectedBrands]);

  return (
    <div className="flex flex-col">
      <div className="px-10">
        <h1 className="font-semibold text-xl">🔥HOT 브랜드</h1>
        <div className="flex-col md:flex-row items-center justify-around mt-6 hidden md:flex">
          <Image src={Nike} alt="nike_brand" width={200} height={200} />
          <Image src={Adidas} alt="adidas" width={200} height={200} />
          <Image
            src={Newbalance}
            alt="newbalance_brand"
            width={200}
            height={200}
          />
        </div>
        <div>
          <BrandBox
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
          />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-5 mt-5 px-10">
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

export default Brand;
