"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUserRoutes } from "@/hooks/useUserRoutes";
import { Loader } from "../ui";
import { useAuthStore } from "@/store/authStore";

export default function AuthGuard({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { refreshRoutes, isValidating } = useUserRoutes();
  const { routes } = useAuthStore();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkPermission = async () => {
      await refreshRoutes();
      const segments = pathname.split("/").filter(Boolean);
      const pageKey = segments[0];
      const current = routes?.[pageKey];


      if (current === "disabled") {
        router.replace("/unauthorized");
      } else {
        setChecked(true);
      }
    };

    checkPermission();
  }, [pathname]);
  if (!checked || isValidating) {
    return <Loader fullScreen />;
  }
  return children;
}
