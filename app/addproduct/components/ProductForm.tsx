"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Size from "@/components/custom ui/Size";
import Color from "@/components/custom ui/Color";
import TextBox from "@/components/custom ui/TextBox";
import ImageUpload from "@/components/custom ui/ImageUpload";
import axios from "axios";

const ProductForm = () => {
  const { data: session } = useSession();
  const id = session?.user.id;
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: `<div>
        <p>
        상품 정보
        </p>
      </div>`,
    category: "",
    style: "",
    size: "",
    brand: "",
    inventory: 0,
    color: "#000",
    price: 0,
    images: "",
    userId: id,
  });
  const [Description, setDescription] = useState<string>("");
  const [info, setInfo] = useState<any>();
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.name === "price"
        ? parseInt(e.target.value)
        : parseInt(e.target.value);
    const inventory =
      e.target.name === "inventory"
        ? parseInt(e.target.value)
        : parseInt(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: value,
      [e.target.name]: inventory,
    });
  };

  const handleImageChange = () => {
    const imageUrl = JSON.stringify(imageUrls);
    setFormData({
      ...formData,
      images: imageUrl,
      description: Description,
      userId: id,
    });
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: Description,
      images: imageUrls.toString(),
      userId: id,
    }));
  }, [imageUrls]);

  const postData = async () => {
    handleImageChange();
    try {
      const response = await axios.post("/api/addproduct", formData);
      if (response.status === 200) {
        return router.push("/");
      }
    } catch (error) {
      console.log("add product error", error);
    }
  };

  return (
    <div className="px-5 max-w-[1280px] mx-auto mb-10">
      <div>
        <Navbar />
      </div>
      <h1 className="text-xl font-bold py-6 mt-4">상품 등록하기</h1>
      <div className="text-black mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="title" className="font-medium">
              상품 이름
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full h-[50px] border-[1px] rounded-md focus:border-gray-600 focus:border-2 outline-none px-3 mt-1"
            />
          </div>
          <div>
            <label htmlFor="category" className="font-medium">
              카테고리
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full h-[50px] border-[1px] rounded-md focus:border-gray-600 focus:border-2 outline-none px-3 mt-1"
            />
          </div>
          <div>
            <label htmlFor="style" className="font-medium">
              스타일
            </label>
            <input
              type="text"
              id="style"
              name="style"
              value={formData.style}
              onChange={handleChange}
              className="w-full h-[50px] border-[1px] rounded-md focus:border-gray-600 focus:border-2 outline-none px-3 mt-1"
            />
          </div>
          <div>
            <label htmlFor="brand" className="font-medium">
              브랜드
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full h-[50px] border-[1px] rounded-md focus:border-gray-600 focus:border-2 outline-none px-3 mt-1"
            />
          </div>
          <div>
            <label htmlFor="inventory" className="font-medium">
              수량
            </label>
            <input
              type="number"
              id="inventory"
              name="inventory"
              value={formData.inventory}
              onChange={handlePriceChange}
              className="w-full h-[50px] border-[1px] rounded-md focus:border-gray-600 focus:border-2 outline-none px-3 mt-1"
            />
          </div>
          <div>
            <label htmlFor="price" className="font-medium">
              가격
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handlePriceChange}
              className="w-full h-[50px] border-[1px] rounded-md focus:border-gray-600 focus:border-2 outline-none px-3 mt-1"
            />
          </div>
          <div>
            <label htmlFor="size" className="font-medium">
              사이즈
            </label>
            <input
              type="text"
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full h-[50px] border-[1px] rounded-md focus:border-gray-600 focus:border-2 outline-none px-3 mt-1"
            />
            <Size setFormData={setFormData} />
          </div>
          <div>
            <div>
              <label htmlFor="color" className="font-medium">
                색상
              </label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full h-[50px] border-[1px] rounded-md focus:border-gray-600 focus:border-2 outline-none px-3 mt-1"
              />
            </div>
            <Color setFormData={setFormData} Color={formData.color} />
          </div>
        </div>
        <label htmlFor="" className="mt-10 inline-block font-medium">
          상품 정보
        </label>
        <TextBox
          setDescription={setDescription}
          description={formData.description}
        />
        <label htmlFor="" className="mt-10 inline-block font-medium">
          이미지
        </label>
        <ImageUpload
          info={info}
          setInfo={setInfo}
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
          handleImageChange={handleImageChange}
        />
        <button
          onClick={postData}
          className="text-white mt-10 border-[1px] bg-black rounded-md px-5 p-2"
        >
          등록하기
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
