"use client"
import { FadeLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";

function Loader({ className, fullScreen = false, page = false }) {
  const fullScreenClass = "fixed inset-0 bg-white/50 z-10";
  const pageClass = "min-h-[calc(100dvh-4rem)] xl:min-h-dvh";
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={`flex items-center justify-center 
        ${className}
        ${fullScreen ? fullScreenClass : ""} 
        ${page ? pageClass : ""}`}
        >
          <div className="flex flex-col items-center justify-center">
            <FadeLoader size={32} />
          </div>
        </div>
      </motion.div>

    </AnimatePresence >

  );
}

export default Loader;
