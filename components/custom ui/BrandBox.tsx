import React from "react";

interface BrandBoxProps {
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
}

const BrandBox: React.FC<BrandBoxProps> = ({
  selectedBrands,
  setSelectedBrands,
}) => {
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prevBrand) =>
      prevBrand.includes(brand)
        ? prevBrand.filter((b) => b !== brand)
        : [...prevBrand, brand]
    );
  };

  return (
    <div className="grid gird-cols-1 md:grid-cols-3 gap-5 px-10 py-4 pb-5 text-sm text-gray-600 mt-3">
      <span
        className={`py-3 px-5 rounded-md text-center ${
          selectedBrands.includes("나이키")
            ? "bg-gray-100"
            : "bg-black text-white"
        }`}
        onClick={() => toggleBrand("나이키")}
      >
        나이키
      </span>
      <span
        className={`py-3 px-5 rounded-md text-center ${
          selectedBrands.includes("아디다스")
            ? "bg-gray-100"
            : "bg-black text-white"
        }`}
        onClick={() => toggleBrand("아디다스")}
      >
        아디다스
      </span>
      <span
        className={`py-3 px-5 rounded-md text-center ${
          selectedBrands.includes("뉴발란스")
            ? "bg-gray-100"
            : "bg-black text-white"
        }`}
        onClick={() => toggleBrand("뉴발란스")}
      >
        뉴발란스
      </span>
    </div>
  );
};

export default BrandBox;
