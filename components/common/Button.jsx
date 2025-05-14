export default function Button({ style, children, type = "button", disabled, onClick, className = "", ...props }) {
  let buttonStyle;
  switch (style) {
    case "clear":
      buttonStyle = "border rounded cursor-pointer disabled:bg-gray-300 disabled:text-white disabled:cursor-default transition-colors hover:bg-gray-100";
      break;
    case "cancel":
      buttonStyle = "border rounded cursor-pointer disabled:bg-gray-300 disabled:text-white disabled:cursor-default transition-colors hover:bg-gray-100";
      break;

    default:
      buttonStyle = "bg-gray-900 text-white rounded hover:bg-gray-700 cursor-pointer disabled:bg-gray-300 disabled:text-white disabled:cursor-default transition-colors";
      break;
  }
  return (
    <button className={`px-4 py-2 text-sm ${buttonStyle} ${className}`} type={type} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  );
}