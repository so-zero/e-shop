import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React from "react";

interface ImageUploadProps {
  info: any;
  setInfo: React.Dispatch<React.SetStateAction<any>>;
  imageUrls: string[];
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  info,
  setInfo,
  imageUrls,
  setImageUrls,
  handleImageChange,
}) => {
  const onUpload = (result: any) => {
    setInfo(result.info.secure_url);
    const imageUrl = result.info.secure_url;
    setImageUrls((prevImageUrls) => [...prevImageUrls, imageUrl]);
    handleImageChange(result);
  };

  const handleDelete = (index: number) => {
    setImageUrls((prevImageUrls) => {
      const updateImageUrls = [...prevImageUrls];
      updateImageUrls.splice(index, 1);
      return updateImageUrls;
    });
  };
  return (
    <div>
      <div className="mb-10">
        <CldUploadWidget uploadPreset="f0xghsj1" onUpload={onUpload}>
          {({ open }: any) => {
            function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
              e.preventDefault();
              open();
            }
            return (
              <button
                onClick={handleClick}
                className="mt-1 border-[1px] rounded-md p-1 px-2"
              >
                업로드
              </button>
            );
          }}
        </CldUploadWidget>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {imageUrls.map((imageUrl, index) => (
          <div key={index} className="flex flex-col justify-center">
            <Image
              src={imageUrl}
              alt={`image ${index + 1}`}
              width={250}
              height={300}
              className="w-full h-full object-cover object-top"
            />
            <button
              onClick={() => handleDelete(index)}
              className="border-[1px] rounded-md p-1 px-2 mt-5"
            >
              삭제하기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
