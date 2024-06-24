import React, { useState, useRef, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
const Dropdown = ({ options, placeholder, onOptionClicked,width,currentOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(currentOption);
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
    onOptionClicked(option);
  };

  return (
    <div className={'relative font-brandFont flex space-x-2 '} ref={dropdownRef}>
      <button
        className={`min-w-40 px-4 py-2 text-left bg-white border border-gray-300 rounded shadow-sm focus:outline-none flex space-x-2 items-center justify-between ${width}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? selectedOption : placeholder}
        <IoMdArrowDropdown />
      </button>
      {isOpen && (
        <div className="absolute top-8 right-0 z-10 w-full mt-2 bg-white border border-gray-300 rounded shadow-lg">
          <ul className="py-1">
            {options.map((option, ind) => (
              <li
                key={ind}
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
