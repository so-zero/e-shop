"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import CollectionBox from "@/components/custom ui/CollectionBox";
import Link from "next/link";
import Image from "next/image";
import Collection_Img from "@/public/collection.jpg";
import axios from "axios";

const Page = () => {
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
  }, [selectedStyles]);
  return (
    <div className="px-5 max-w-[1280px] mx-auto mb-10">
      <Navbar />
      <div className="mt-5 md:mt-20 relative flex justify-center md:justify-end items-center">
        <Image
          src={Collection_Img}
          width={1200}
          height={500}
          alt="banner"
          className="object-cover object-right md:object-center overflow-hidden h-[400px] md:h-[500px] mx-auto"
        />
        <p className="text-2xl absolute bottom-2 right-3 md:right-10 text-white font-semibold">
          2024
          <span className="block">Fashion Collections</span>
        </p>
      </div>
      <div className="flex flex-col mt-10">
        <div>
          <CollectionBox
            selectedStyles={selectedStyles}
            setSelectedStyles={setSelectedStyles}
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
    </div>
  );
};

export default Page;
