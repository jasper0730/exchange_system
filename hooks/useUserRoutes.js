import useSWR from "swr";
import { useAuthStore } from "@/store/authStore";

const fetcher = (url) => fetch(url).then(res => res.json());

export function useUserStore() {
  const { setRoutes, setRole } = useAuthStore();
  const { data, mutate, isValidating } = useSWR("/api/role", fetcher, {
    revalidateOnFocus: true, // 切換頁籤時觸發
  });

  if (data) {
    setRoutes(data.routes);
    setRole(data.role);
  }

  return {
    routes: data?.routes || [],
    role: data?.role || "",
    refreshRoutes: mutate,
    isValidating
  };
};
