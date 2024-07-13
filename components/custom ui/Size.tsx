import React, { useState } from "react";

interface SizeProps {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const Size: React.FC<SizeProps> = ({ setFormData }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const sizes = ["S", "M", "L", "XL", "XXL"];

  const handleSizeChange = (size: string) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(size)) {
        return prevSelected.filter((selected) => selected !== size);
      } else {
        return [...prevSelected, size];
      }
    });
  };

  const handleSubmit = () => {
    setFormData((prevFormData: FormData) => ({
      ...prevFormData,
      size: selected.join(", "),
    }));
  };

  return (
    <div>
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => handleSizeChange(size)}
          className={`border-[0.5px] rounded-md text-center text-[14px] py-[2px] cursor-pointer px-3 mt-4 mb-5 mr-5 ${
            selected.includes(size) ? "bg-gray-600 text-white" : " "
          }`}
        >
          {size}
        </button>
      ))}
      <button onClick={handleSubmit}>선택하기</button>
    </div>
  );
};

export default Size;
