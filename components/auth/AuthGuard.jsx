"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUserRoutes } from "@/hooks/useUserRoutes";

export default function AuthGuard({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { routes, refreshRoutes } = useUserRoutes();

  useEffect(() => {
    const checkPermission = async () => {
      const data = await refreshRoutes();
      const current = data.routes.find((r) => r.path === pathname);
      if (!current || current.status === "disabled") {
        router.replace("/unauthorized");
      }
    };

    checkPermission();
  }, [pathname]);

  return children;
}
