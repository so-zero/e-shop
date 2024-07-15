"use client";

import Image from "next/image";
import React, { useState } from "react";

interface ImageCardProps {
  imageUrls: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrls }) => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const urlArray = imageUrls.split(",");
  return (
    <div className="flex flex-col gap-3 max-w-[500px]">
      <Image
        src={urlArray[selectedImage]}
        alt="product image"
        width={500}
        height={500}
        className="w-[400px] h-[430px] object-cover object-top"
      />
      <div className="flex gap-2 overflow-auto scrollbar-hide">
        {urlArray.map((url, index) => (
          <div key={index} className="image relative rounded-md">
            <Image
              onClick={() => setSelectedImage(index)}
              className={`w-[94px] h-[93px] rounded-md mb-3 p-1 object-cover object-top cursor-pointer ${
                selectedImage === index
                  ? "border-[1px] border-gray-500"
                  : "border-[1px] border-gray-200"
              }`}
              src={url}
              alt="product image"
              width={70}
              height={70}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCard;
