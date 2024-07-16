"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

interface FilterProps {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSize: string[];
  setSelectedSize: React.Dispatch<React.SetStateAction<string[]>>;
  allColorValues: string[];
  setAllColorValues: React.Dispatch<React.SetStateAction<string[]>>;
  selectedColorValues: string[];
  setSelectedColorValues: React.Dispatch<React.SetStateAction<string[]>>;
  price: { min: number; max: number };
  setPrice: React.Dispatch<React.SetStateAction<{ min: number; max: number }>>;
}

const Filter: React.FC<FilterProps> = ({
  selectedCategories,
  setSelectedCategories,
  selectedSize,
  setSelectedSize,
  allColorValues,
  setAllColorValues,
  selectedColorValues,
  setSelectedColorValues,
  price,
  setPrice,
}) => {
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.name === "min" ? parseInt(e.target.value) : e.target.value;
    setPrice({
      ...price,
      [e.target.name]: value,
    });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.name === "max" ? parseInt(e.target.value) : e.target.value;
    setPrice({
      ...price,
      [e.target.name]: value,
    });
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSize((prevSize) =>
      prevSize.includes(size)
        ? prevSize.filter((s) => s !== size)
        : [...prevSize, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColorValues((prevColor) =>
      prevColor.includes(color)
        ? prevColor.filter((c) => c !== color)
        : [...prevColor, color]
    );
  };

  const getAllColors = async () => {
    try {
      const response = await axios.get("/api/color");
      return response.data;
    } catch (error) {
      console.error("get color error", error);
      return null;
    }
  };

  useEffect(() => {
    getAllColors().then((allColors) => {
      if (allColors) {
        const colorSet = new Set<string>();
        allColors.forEach((element: any) => {
          const colors = element.color.split(",");
          colors.forEach((color: string) => {
            const colorValue = color.replace("#", "");
            colorSet.add(colorValue);
          });
        });
        const uniqueColorValues: string[] = Array.from(colorSet);
        setAllColorValues(uniqueColorValues);
      }
    });
  }, []);

  const allColorValue = allColorValues;

  return (
    <div className="relative">
      <div
        className={`md:w-[250px] border-l-[0.5px] border-r-[0.5px] ${
          showFilter ? "max-md:w-[250px]" : "w-0 max-md:invisible"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b-[0.5px]">
          <h1 className="text-gray-800">필터</h1>
        </div>
        <div className="flex flex-col py-3 pb-5 text-sm text-gray-600 border-b-[0.5px]">
          <span
            className={`py-3 px-5 ${
              selectedCategories.includes("top") ? "bg-gray-100" : ""
            }`}
            onClick={() => toggleCategory("top")}
          >
            상의
          </span>
          <span
            className={`py-3 px-5 ${
              selectedCategories.includes("outer") ? "bg-gray-100" : ""
            }`}
            onClick={() => toggleCategory("outer")}
          >
            아우터
          </span>
          <span
            className={`py-3 px-5 ${
              selectedCategories.includes("pant") ? "bg-gray-100" : ""
            }`}
            onClick={() => toggleCategory("pant")}
          >
            바지
          </span>
          <span
            className={`py-3 px-5 ${
              selectedCategories.includes("dress&skirt") ? "bg-gray-100" : ""
            }`}
            onClick={() => toggleCategory("dress&skirt")}
          >
            원피스/스커트
          </span>
          <span
            className={`py-3 px-5 ${
              selectedCategories.includes("shoes") ? "bg-gray-100" : ""
            }`}
            onClick={() => toggleCategory("shoes")}
          >
            신발
          </span>
          <span
            className={`py-3 px-5 ${
              selectedCategories.includes("bag") ? "bg-gray-100" : ""
            }`}
            onClick={() => toggleCategory("bag")}
          >
            가방
          </span>
          <span
            className={`py-3 px-5 ${
              selectedCategories.includes("beauty") ? "bg-gray-100" : ""
            }`}
            onClick={() => toggleCategory("beauty")}
          >
            뷰티
          </span>
          <span
            className={`py-3 px-5 ${
              selectedCategories.includes("life") ? "bg-gray-100" : ""
            }`}
            onClick={() => toggleCategory("life")}
          >
            라이프
          </span>
        </div>
        <div className="border-b-[0.5px] pb-10">
          <div className="flex items-center justify-between px-5 py-4 border-b-[0.5px] mb-5">
            <h1 className="text-gray-800">가격</h1>
          </div>
          <div className="flex items-center flex-col gap-5 px-5 overflow-hidden">
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="min" className="text-[15px] opacity-75 mb-1">
                낮은가격순
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1">₩</span>
                <input
                  type="number"
                  name="min"
                  id="min"
                  value={price.min}
                  onChange={handleMinChange}
                  className="w-full outline-none border-[1px] rounded-md px-2 text-center py-[2px]"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="max" className="text-[15px] opacity-75 mb-1">
                높은가격순
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1">₩</span>
                <input
                  type="number"
                  name="max"
                  id="max"
                  value={price.max}
                  onChange={handleMaxChange}
                  className="w-full outline-none border-[1px] rounded-md px-2 text-center py-[2px]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border-b-[0.5px]">
          <div className="flex items-center justify-between px-5 py-4 border-b-[0.5px] mb-5">
            <h1 className="text-gray-800">색상</h1>
          </div>
          <ul className="grid grid-cols-4 px-5 gap-5 mb-4">
            {allColorValue.map((color, index) => (
              <li
                key={index}
                className={`w-[40px] h-[40px] rounded-xl border-[0.5px] border-gray-300 cursor-pointer ${
                  selectedColorValues.includes(`#${color}`) ? "opacity-25" : ""
                }`}
                style={{ backgroundColor: `#${color}` }}
                onClick={() => toggleColor(`#${color}`)}
              ></li>
            ))}
          </ul>
        </div>
        <div className="sizes">
          <div className="flex items-center justify-between px-5 py-4 border-b-[0.5px] mb-5">
            <h1 className="text-gray-800">사이즈</h1>
          </div>
          <ul className="grid grid-cols-4 px-5 gap-5">
            <li
              className={`border-[0.5px] rounded-md text-center text-[14px] py-[2px] cursor-pointer ${
                selectedSize.includes("S") ? "bg-gray-900 text-white" : ""
              }`}
              onClick={() => toggleSize("S")}
            >
              S
            </li>
            <li
              className={`border-[0.5px] rounded-md text-center text-[14px] py-[2px] cursor-pointer ${
                selectedSize.includes("M") ? "bg-gray-900 text-white" : ""
              }`}
              onClick={() => toggleSize("M")}
            >
              M
            </li>
            <li
              className={`border-[0.5px] rounded-md text-center text-[14px] py-[2px] cursor-pointer ${
                selectedSize.includes("L") ? "bg-gray-900 text-white" : ""
              }`}
              onClick={() => toggleSize("L")}
            >
              L
            </li>
            <li
              className={`border-[0.5px] rounded-md text-center text-[14px] py-[2px] cursor-pointer ${
                selectedSize.includes("XL") ? "bg-gray-900 text-white" : ""
              }`}
              onClick={() => toggleSize("XL")}
            >
              XL
            </li>
            <li
              className={`border-[0.5px] rounded-md text-center text-[14px] py-[2px] cursor-pointer mb-4 ${
                selectedSize.includes("XXL") ? "bg-gray-900 text-white" : ""
              }`}
              onClick={() => toggleSize("XXL")}
            >
              XXL
            </li>
          </ul>
        </div>
      </div>
      <div
        onClick={() => setShowFilter(!showFilter)}
        className="absolute md:hidden top-[20px] right-[-42px] rotate-90 bg-gray-100 px-2 rounded-t-sm cursor-pointer"
      >
        <HiOutlineAdjustmentsHorizontal size={20} />
      </div>
    </div>
  );
};

export default Filter;
