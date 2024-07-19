import React from "react";

interface CollectionBoxProps {
  selectedStyles: string[];
  setSelectedStyles: React.Dispatch<React.SetStateAction<string[]>>;
}

const CollectionBox: React.FC<CollectionBoxProps> = ({
  selectedStyles,
  setSelectedStyles,
}) => {
  const toggleCategory = (style: string) => {
    setSelectedStyles((prevStyles) =>
      prevStyles.includes(style)
        ? prevStyles.filter((s) => s !== style)
        : [...prevStyles, style]
    );
  };

  return (
    <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 px-10 py-4 pb-5 text-sm text-gray-600 ">
      <span
        className={`py-3 px-5 rounded-md ${
          selectedStyles.includes("캐주얼")
            ? "bg-black text-white"
            : "bg-gray-100"
        }`}
        onClick={() => toggleCategory("캐주얼")}
      >
        캐주얼
      </span>
      <span
        className={`py-3 px-5 rounded-md ${
          selectedStyles.includes("스트릿")
            ? "bg-black text-white"
            : "bg-gray-100"
        }`}
        onClick={() => toggleCategory("스트릿")}
      >
        스트릿
      </span>
      <span
        className={`py-3 px-5 rounded-md ${
          selectedStyles.includes("모던")
            ? "bg-black text-white"
            : "bg-gray-100"
        }`}
        onClick={() => toggleCategory("모던")}
      >
        모던
      </span>
      <span
        className={`py-3 px-5 rounded-md ${
          selectedStyles.includes("놈코어")
            ? "bg-black text-white"
            : "bg-gray-100"
        }`}
        onClick={() => toggleCategory("놈코어")}
      >
        놈코어
      </span>
    </div>
  );
};

export default CollectionBox;
