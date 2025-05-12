"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SideMenu from "@/components/layout/SideMenu";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import AuthGuard from "@/components/auth/AuthGuard";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleMenuClick() {
    setMenuOpen((prev) => !prev);
  }
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);
  return (
    <AuthGuard>
      <div className="hidden xl:block">
        <SideMenu />
      </div>
      <div>
        <Navbar onMenuToggle={handleMenuClick} />
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="xl:hidden fixed inset-0 bg-black/30 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              className="bg-primary w-72 h-full"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <SideMenu />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="xl:ml-[300px] mt-16 xl:mt-0">{children}</div>
    </AuthGuard>
  );
}
