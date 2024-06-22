import React, { useState, useRef, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
const Dropdown = ({ options, placeholder,onOptionClicked }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onOptionClicked(option)
  };

  return (
    <div className="relative font-brandFont w-36" ref={dropdownRef}>
      <button
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded shadow-sm focus:outline-none flex space-x-2 items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? selectedOption : placeholder}
        <IoMdArrowDropdown />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded shadow-lg">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
