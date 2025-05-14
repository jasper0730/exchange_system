export default function Calender({ className, ...props }) {
  return (
    <input
      type="date"
      className={`border border-gray-300 p-2 rounded text-gray-700 ${className}`}
      {...props}
    />
  );
}