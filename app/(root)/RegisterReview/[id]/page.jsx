"use client";
import { Button } from "@/components/common";
import { PageLayout, PageTitle } from "@/components/ui";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterReviewDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [reviewResult, setReviewResult] = useState("");
  const [remark, setRemark] = useState("");

  const isValid = reviewResult !== "";
  const handleSubmit = () => {
    console.log('送出');
  };
  return (
    <PageLayout>
      <PageTitle title="會員審核詳情" />
      <div className="mt-10">
        <h2 className="text-xl font-semibold">基本資料</h2>
        <div className="flex flex-col gap-2 mt-3">
          <div className="flex items-center gap-2">
            <p className="text-gray-700 font-bold">姓名：</p>
            <p className="text-gray-700">Jasper</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-gray-700 font-bold">帳號：</p>
            <p className="text-gray-700">user123</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-gray-700 font-bold">註冊日期：</p>
            <p className="text-gray-700">2025/03/24</p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-xl font-semibold">上傳文件</h2>
        <img src="111/" alt="身分證明文件" className="rounded border mt-3" />
      </div>
      <div className="mt-5">
        <h2 className="text-xl font-semibold">KYC 驗證狀態</h2>
        <p className="text-gray-700 mt-3">註冊待審</p>
      </div>
      <div className="mt-5">
        <h2 className="text-xl font-semibold">審核結果</h2>
        <div className="flex gap-4 mt-3">
          {["通過", "拒絕", "補件"].map(option => (
            <label key={option} className="flex items-center gap-1">
              <input
                type="radio"
                name="reviewResult"
                value={option}
                checked={reviewResult === option}
                onChange={(e) => setReviewResult(e.target.value)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-xl font-semibold">備註</h2>
        <textarea
          rows="4"
          className="w-full border border-gray-300 rounded p-2 mt-3"
          placeholder="請輸入備註說明..."
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
        />
      </div>
      <div className="flex gap-4 mt-5 justify-end">
        <Button onClick={() => router.back()}>
          返回
        </Button>
        <Button onClick={handleSubmit} disabled={!isValid}>
          確認提交
        </Button>
      </div>
    </PageLayout>

  );
}
