import { FiSearch } from "react-icons/fi";


export default function SearchBar({ onChange, value, className = "", placeholder, type = "text" }) {
  return (
    <div className="flex items-center border border-gray-300 rounded px-3 py-2 w-100 bg-white">
      <FiSearch className="text-gray-500 text-lg" />
      <input
        type={type}
        placeholder={placeholder}
        className={`ml-2 outline-none flex-1 text-gray-700 ${className}`}
        value={value || ""}
        onChange={onChange}
      />
    </div>
  );
} 