"use client";
import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function Dropdown({ options = [], value, onChange, placeholder = "請選擇...", defaultText }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const handleSelect = (option) => {
    onChange(option === "__EMPTY" ? "" : option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block min-w-60 w-full" ref={dropdownRef}>
      <button
        type="button"
        className="w-full border-gray-300 border px-4 py-2 rounded text-left bg-white text-gray-700 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || placeholder}
        <FiChevronDown className="ml-2" />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow">
          {defaultText ?
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-500"
              onClick={() => handleSelect("__EMPTY")}
            >
              {defaultText}
            </li>

            :
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-500"
              onClick={() => handleSelect("__EMPTY")}
            >
              {placeholder}
            </li>
          }
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
