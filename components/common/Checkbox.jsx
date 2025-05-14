export default function Checkbox({ className = "", ...props }) {
  return (
    <input
      type="checkbox"
      className={`
        appearance-none w-5 h-5 border border-gray-500 rounded-full 
        relative cursor-pointer transition 
        before:content-[''] before:absolute before:top-1/2 before:left-1/2 
        before:w-3 before:h-3 before:rounded-full before:bg-gray-900 
        before:transform before:-translate-x-1/2 before:-translate-y-1/2 
        before:scale-0 checked:before:scale-100
        ${className}
      `}
      {...props}
    />
  );
}
