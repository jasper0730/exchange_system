import { AiOutlineClose } from "react-icons/ai";

export default function CloseButton({ ...props }) {
  return (
    <button
      type="button"
      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
      {...props}
    >
      <AiOutlineClose size={24} />
    </button>
  );
}