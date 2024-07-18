import React from "react";

interface CateProps {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const Cate: React.FC<CateProps> = ({
  selectedCategories,
  setSelectedCategories,
}) => {
  const toggleCategory = (category: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  return (
    <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 px-10 py-4 pb-5 text-sm text-gray-600 ">
      <span
        className={`py-3 px-5 rounded-md ${
          selectedCategories.includes("top")
            ? "bg-black text-white"
            : "bg-gray-100"
        }`}
        onClick={() => toggleCategory("top")}
      >
        상의
      </span>
      <span
        className={`py-3 px-5 rounded-md ${
          selectedCategories.includes("outer")
            ? "bg-black text-white"
            : "bg-gray-100"
        }`}
        onClick={() => toggleCategory("outer")}
      >
        아우터
      </span>
      <span
        className={`py-3 px-5 rounded-md ${
          selectedCategories.includes("pant")
            ? "bg-black text-white"
            : "bg-gray-100"
        }`}
        onClick={() => toggleCategory("pant")}
      >
        바지
      </span>
      <span
        className={`py-3 px-5 rounded-md ${
          selectedCategories.includes("dress&skirt")
            ? "bg-black text-white"
            : "bg-gray-100"
        }`}
        onClick={() => toggleCategory("dress&skirt")}
      >
        원피스/스커트
      </span>
      <span
        className={`py-3 px-5 rounded-md ${
          selectedCategories.includes("shoes")
            ? "bg-black text-white"
            : "bg-gray-100"
        }`}
        onClick={() => toggleCategory("shoes")}
      >
        신발
      </span>
      <span
        className={`py-3 px-5 rounded-md ${
          selectedCategories.includes("bag")
            ? "bg-black text-white"
            : "bg-gray-100"
        }`}
        onClick={() => toggleCategory("bag")}
      >
        가방
      </span>
      <span
        className={`py-3 px-5 rounded-md ${
          selectedCategories.includes("beauty")
            ? "bg-black text-white"
            : "bg-gray-100"
        }`}
        onClick={() => toggleCategory("beauty")}
      >
        뷰티
      </span>
      <span
        className={`py-3 px-5 rounded-md ${
          selectedCategories.includes("life")
            ? "bg-black text-white"
            : "bg-gray-100"
        }`}
        onClick={() => toggleCategory("life")}
      >
        라이프
      </span>
    </div>
  );
};

export default Cate;
