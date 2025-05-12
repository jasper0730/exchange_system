"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUserRoutes } from "@/hooks/useUserRoutes";
import { useAuthStore } from "@/store/authStore";

export default function AuthGuard({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { refreshRoutes } = useUserRoutes();
  const { routes } = useAuthStore();

  useEffect(() => {
    const checkPermission = async () => {
      await refreshRoutes();
      const segments = pathname.split("/").filter(Boolean);
      const pageKey = segments[0];
      const current = routes?.[pageKey];
      if (current === "disabled") {
        router.replace("/unauthorized");
      }
    };

    checkPermission();
  }, [pathname]);
  return children;
}
