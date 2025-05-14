export default function Radio({ className = "", ...props }) {
  return (
    <input
      type="radio"
      className="form-radio accent-gray-900 h-5 w-5 cursor-pointer"
      {...props}
    />
  );
}