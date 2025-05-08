import { FadeLoader } from "react-spinners";

function Loader({ className, fullScreen = false, page = false }) {
  const fullScreenClass = "fixed inset-0 bg-white bg-opacity-30 z-10";
  const pageClass = "min-h-[calc(100dvh-4rem)] xl:min-h-dvh";
  return (
    <div
      className={`flex items-center justify-center 
        ${className}
        ${fullScreen ? fullScreenClass : undefined} 
        ${page ? pageClass : undefined}`}
    >
      <div className="flex flex-col items-center justify-center">
        <FadeLoader size={32} />
      </div>
    </div>
  );
}

export default Loader;
