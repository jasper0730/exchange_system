"use client";
import { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [account, setAccount] = useState("davidwang12");
  const [password, setPassword] = useState("admin");
  const isValid = account !== "" && password !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      Account: account,
      Password: password,
    };
    try {
      const response = await fetch(`/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.ok) {
        Swal.fire({
          icon: "success",
          title: "登入成功",
          
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "登入失敗",
        text: error.message || "請重新登入",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">登入</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="account">
            帳號
          </label>
          <input
            id="account"
            type="text"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="請輸入帳號"
          />
        </div>
        <div className="mb-6 relative">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            密碼
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
              placeholder="請輸入密碼"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 focus:outline-none cursor-pointer"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className={` w-full font-semibold py-2 px-4 rounded transition text-white 
            ${isValid ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300"}
          `}
          disabled={!isValid}
        >
          登入
        </button>
        <div className="flex justify-center mt-3">
          <Link
            href="/forgot-password"
            className="text-blue-500 hover:opacity-80 text-sm"
          >
            忘記密碼？
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
