"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SideMenu, Navbar } from "@/components/layout";
import { motion, AnimatePresence } from "framer-motion";
import { AuthGuard } from "@/components/auth";
import 'overlayscrollbars/overlayscrollbars.css';
import { useUIStore } from "@/store";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { sideMenuCollapsed } = useUIStore();

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
              className="bg-gray-900 w-72 h-full"
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
      <div className={`mt-16 xl:mt-0 ${sideMenuCollapsed ? "xl:ml-[80px]" : "xl:ml-[300px]"}`}>{children}</div>
    </AuthGuard>
  );
}
