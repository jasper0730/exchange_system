export default function Button({ style, children, type = "button", disabled, onClick, className = "", ...props }) {
  let buttonStyle;
  switch (style) {
    case "clear":
      buttonStyle = "px-4 py-2 border rounded cursor-pointer disabled:bg-gray-300 disabled:text-white disabled:cursor-default transition-colors";
      break;

    default:
      buttonStyle = "px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 cursor-pointer disabled:bg-gray-300 disabled:text-white disabled:cursor-default transition-colors";
      break;
  }
  return (
    <button className={`${buttonStyle} ${className}`} type={type} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  );
}