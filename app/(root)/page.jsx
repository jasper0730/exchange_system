"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
export default function Home() {
  const router = useRouter();
  const { routes } = useAuthStore();
  console.log(routes)
  useEffect(() => {
    const firstAvailableRoute = Object.entries(routes).find(
      ([_, status]) => status !== "disabled"
    );

    if (firstAvailableRoute) {
      const [path] = firstAvailableRoute;
      router.replace(`/${path}`);
    } else {
      router.replace("/unauthorized");
    }
  }, [routes]);
  return null;
}
