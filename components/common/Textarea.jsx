export default function Textarea({
  className = "",
  ...props
}) {
  return (
    <textarea
      className={`border border-gray-300 p-2 w-full rounded text-gray-700 ${className}`}
      {...props}
    />
  );
}