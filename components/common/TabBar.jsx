
export function TabButton({ children, isActive, className, ...props }) {
  return (
    <button
      className={`px-4 py-2 font-bold cursor-pointer ${isActive
        ? "border-b-2 border-gray-900 text-gray-900"
        : "text-gray-500"
        } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
export function TabBar({ children }) {
  return (
    <div className="flex gap-4 border-b mt-10">
      {children}
    </div>
  );
}