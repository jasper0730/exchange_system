export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-7xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">找不到頁面</h2>
      <p className="mb-6 text-gray-500">您要找的頁面不存在或已被移除。</p>
      <a
        href="/"
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        回到首頁
      </a>
    </div>
  );
}
