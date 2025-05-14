"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Link from "next/link";

const otpSeconds = 300;
export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [account, setAccount] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpResendTimer, setOtpResendTimer] = useState(0);

  // 控制重新發送驗證碼倒數
  const handleResendOtp = () => {
    setOtpSent(true);
    setOtpResendTimer(otpSeconds);
    Swal.fire({ icon: "success", title: "驗證碼已重新發送" });
  };

  // 倒數計時
  useEffect(() => {
    if (otpResendTimer > 0) {
      const timer = setTimeout(
        () => setOtpResendTimer(otpResendTimer - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [otpResendTimer]);

  // 驗證只能輸入數字
  const handleOtpChange = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    setOtp(val);
  };

  // 發送OTP
  const handleNext = (e) => {
    e.preventDefault();
    setOtpSent(true);
    setStep(2);
    setOtpResendTimer(otpSeconds);
    Swal.fire({ icon: "success", title: "驗證碼已發送" });
  };

  // 確認重設密碼
  const handleConfirm = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({ icon: "error", title: "密碼不一致" });
      return;
    }
    Swal.fire({
      icon: "success",
      title: "密碼重設成功",
      text: "請用新密碼登入。",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">忘記密碼</h2>
        {step === 1 && (
          <>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="account">
                帳號
              </label>
              <input
                id="account"
                type="text"
                value={account ?? ""}
                onChange={(e) => setAccount(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="請輸入帳號"
              />
            </div>
            <button
              type="button"
              className={`w-full font-semibold py-2 px-4 rounded transition text-white ${account ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300"
                }`}
              disabled={!account}
              onClick={handleNext}
            >
              下一步
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="otp">
                驗證碼
              </label>
              <input
                id="otp"
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                value={otp ?? ""}
                onChange={handleOtpChange}
                required
                maxLength={6}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="請輸入6位數驗證碼"
              />
              <div className="flex justify-between items-center mt-2">
                <button
                  type="button"
                  className={`text-blue-500 hover:underline text-sm disabled:text-gray-400 disabled:cursor-not-allowed`}
                  onClick={handleResendOtp}
                  disabled={otpResendTimer > 0}
                >
                  {otpResendTimer > 0
                    ? `重新發送 (${otpResendTimer}s)`
                    : "重新發送驗證碼"}
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                新密碼
              </label>
              <input
                id="password"
                type="password"
                value={password ?? ""}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="請輸入新密碼"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="confirmPassword"
              >
                確認新密碼
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword ?? ""}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="請再次輸入新密碼"
              />
            </div>
            <button
              type="button"
              className={`w-full font-semibold py-2 px-4 rounded transition text-white ${otp && password && confirmPassword
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-300"
                }`}
              disabled={!(otp && password && confirmPassword)}
              onClick={handleConfirm}
            >
              確認
            </button>
          </>
        )}
        <div className="flex justify-center mt-4">
          <Link
            href="/login"
            className="text-blue-500 hover:opacity-80 text-sm"
          >
            回登入頁
          </Link>
        </div>
      </form>
    </div>
  );
}
