"use client";

import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-bold mb-4">🚫 沒有權限</h1>
      <p className="text-lg text-gray-700 mb-8">
        您沒有訪問此頁面的權限，請聯絡系統管理員。
      </p>
      <button
        onClick={() => router.push("/")}
        className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-900 transition cursor-pointer"
      >
        返回首頁
      </button>
    </div>
  );
}
