import { useState, useEffect } from "react";
/**
 * 打 API 確認當前路徑是否有訪問權限
 * @param {string} path 檢查權限的路徑
 * @returns {{ access: boolean, isLoading: boolean }} 
 * - access：是否有權限訪問該頁面
 * - isLoading: loading狀態
 */
export function usePermission(path) {
  const pathName = path.replace(/^\//, '');
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/permission');
      const result = await res.json();
      if (result.ok) {
        const filterRoutes = Object.entries(result.routes)
          .filter(([_, value]) => value !== "disabled")
          .map(([key]) => key);
        setRoutes(filterRoutes);
      } else {
        throw new Error(result.message);

      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [pathName]);

  return {
    routes,
    access: [],
    isLoading
  };
}