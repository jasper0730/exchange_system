export default function Input({ className = "", type = "text", ...props }) {
  return (
    <input
      type={type}
      className={`border p-2 w-full rounded text-gray-700 border-gray-300 ${className}`}
      {...props}
    />
  );
} 