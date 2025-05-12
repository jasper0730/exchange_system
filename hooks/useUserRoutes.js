import useSWR from "swr";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

const fetcher = (url) => fetch(url).then(res => res.json());

export function useUserRoutes() {
  const { setRoutes, setRole } = useAuthStore();
  const { data, mutate, isValidating } = useSWR("/api/role", fetcher, {
    revalidateOnFocus: true, // 切換頁籤時觸發
  });

  useEffect(() => {
    if (data) {
      setRoutes(data.Routes);
      setRole(data.Role);
    }
  }, [data, setRoutes, setRole]);

  return {
    routes: data?.Routes || {},
    role: data?.Role || "",
    refreshRoutes: mutate,
    isValidating
  };
};
