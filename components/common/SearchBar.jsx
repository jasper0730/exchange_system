import { FiSearch } from "react-icons/fi";


export default function SearchBar({ onChange, value, placeholder = "請輸入關鍵字", type = "text" }) {
  return (
    <div className={`flex items-center border border-gray-300 rounded px-3 py-2 bg-white w-full`}>
      <FiSearch className="text-gray-500 text-lg" />
      <input
        type={type}
        placeholder={placeholder}
        className={`ml-2 outline-none flex-1 text-gray-700`}
        value={value || ""}
        onChange={onChange}
      />
    </div>
  );
} 