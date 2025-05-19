import { FaEdit, FaTrash } from "react-icons/fa";
import { FiEye } from "react-icons/fi";

export default function IconButton({ style, className = "", size = "18", ...props }) {
  let icon;
  switch (style) {
    case "edit":
      icon = <FaEdit size={size} />;
      break;
    case "delete":
      icon = <FaTrash size={size} />;
      break;
    case "view":
      icon = <FiEye size={size} />;
      break;
    default:
      break;
  }
  return (
    <button
      className={`text-gray-500 hover:text-gray-900 p-1 rounded transition-colors cursor-pointer disabled:cursor-default disabled:text-gray-300 ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
}