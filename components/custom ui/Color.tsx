import React, { useEffect, useState } from "react";
import ColorPicker from "react-pick-color";
import { GrAdd } from "react-icons/gr";

interface ColorProps {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  Color: string;
}

const Color: React.FC<ColorProps> = ({ setFormData, Color }) => {
  const [color, setColor] = useState("#fff");
  const [open, setOpen] = useState<boolean>(false);
  const colorArray: string[] = Color.split(", ");
  const [selected, setSelected] = useState<string[]>(colorArray);

  if (colorArray.length < 0) {
    setSelected([]);
  }

  const handleColorChange = () => {
    setSelected((prevSelected) => [...prevSelected, color]);
    setOpen(false);
  };

  useEffect(() => {
    const handleSelectedColors = () => {
      setFormData((prevFormData: FormData) => ({
        ...prevFormData,
        color: selected.join(", "),
      }));
    };
    handleSelectedColors();
  }, [selected]);

  const handleDeleteColor = (indexToDelete: number) => {
    setSelected((prevSelected) => {
      const updateColors = [...prevSelected];
      updateColors.splice(indexToDelete, 1);
      return updateColors;
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-3">
        <button
          onClick={() => setOpen(!open)}
          className="block border-[1px] rounded-md p-1 px-3 text-[14px]"
        >
          색상 선택하기
        </button>
        {open && (
          <ColorPicker
            color={color}
            onChange={(color) => setColor(color.hex)}
          />
        )}
        <button
          onClick={handleColorChange}
          className="flex items-center space-x-1 border-[1px] rounded-md p-1 px-3 text-[14px]"
        >
          추가하기 <GrAdd size={14} className="ml-2" />
        </button>
      </div>
      <div>
        {selected.map((selectedColor, index) => (
          <div key={index} className="flex items-center space-x-4 m-2">
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "100%",
                backgroundColor: selectedColor,
                display: "inline-block",
              }}
            ></div>
            <span className="border-[1px] rounded-md p-1 px-3 text-[14px]">
              {selectedColor}
            </span>
            <button
              onClick={() => handleDeleteColor(index)}
              className="border-[1px] rounded-md p-1 px-3 text-[14px]"
            >
              삭제하기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Color;
