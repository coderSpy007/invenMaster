import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

interface DropdownProps {
  value: any; 
  onChange: (value: any) => void; 
  options: { value: any; text: any }[]; 
}

const Dropdown = ({ value, onChange, options } : DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (selectedValue: any) => {
    onChange(selectedValue);
    setIsOpen(false); 
  };

  return (
    <div className="relative">
      <button
        className="flex items-center py-[2.8px] px-[1rem] border-[1px] border-grey-500 rounded-md"
        onClick={toggleDropdown}
      >
        <p className={value ? "text-black-500" : "text-gray-400"}>{value || "Select an option"}</p>
        <RiArrowDropDownLine className="text-[2rem] text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute bg-white shadow-lg rounded-md mt-2 w-[12rem]">
          <ul className="p-2">
            {options.map((option) => (
              <li
                key={option.value}
                className={`hover:bg-gray-100 px-4 py-2 cursor-pointer ${
                  value === option.value ? "bg-gray-200" : ""
                }`}
                onClick={() => handleSelect(option.value)}
              >
                {option.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
