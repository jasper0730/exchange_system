"use client";
import { useState } from "react";
import { PageLayout, PageTitle } from "@/components/ui";
import { Button } from "@/components/common";
import { FaEye } from "react-icons/fa";
import Swal from "sweetalert2";

const tabs = [
  { key: "update", label: "匯率更新" },
  { key: "review", label: "匯率審核" },
  { key: "settings", label: "參數設定" },
];

export default function ExchangeRate() {
  const [activeTab, setActiveTab] = useState("update");

  return (
    <PageLayout>
      <PageTitle title="匯率更新與調整" />
      <div className="flex gap-4 border-b mt-10">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 font-semibold ${
              activeTab === tab.key
                ? "border-b-2 border-gray-900 text-gray-900"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-6">
        {activeTab === "update" && <ExchangeUpdate />}
        {activeTab === "review" && <ExchangeReview />}
        {activeTab === "settings" && <ExchangeSettings />}
      </div>
    </PageLayout>
  );
}

function ExchangeUpdate() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">匯率更新</h2>
      <select className="border p-2 rounded w-full text-gray-700">
        <option>銀行</option>
        <option>市場報價</option>
      </select>
      <p className="text-gray-700">貨幣對：TWD/USD</p>
      <input
        type="number"
        className="border p-2 rounded w-full text-gray-700"
        placeholder="請輸入匯率"
      />
      <p className="text-gray-500">上次更新時間：2025/03/25 負責人：David</p>
      <Button>確認更新</Button>
    </div>
  );
}
const mockData = [
  {
    id: "1",
    currencyPair: "TWD/USD",
    beforeRate: 31.75,
    afterRate: 31.85,
    applicant: "admin01",
    appliedAt: "2025/05/20 14:30",
  },
  {
    id: "2",
    currencyPair: "USD/VND",
    beforeRate: 24500,
    afterRate: 24600,
    applicant: "admin02",
    appliedAt: "2025/05/21 10:00",
  },
];
function ExchangeReview() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [reviewResult, setReviewResult] = useState("");
  const [remark, setRemark] = useState("");

  const handleReviewSubmit = () => {
    Swal.fire({
      icon: "success",
      title: "審核結果已提交",
    });
    setSelectedCase(null);
    setReviewResult("");
    setRemark("");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">匯率審核</h2>
      <div>
        <table className="min-w-full bg-white border border-gray-200 text-left">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="px-4 py-2">貨幣對</th>
              <th className="px-4 py-2">申請人</th>
              <th className="px-4 py-2">申請時間</th>
              <th className="px-4 py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="px-4 py-2">{item.currencyPair}</td>
                <td className="px-4 py-2">{item.applicant}</td>
                <td className="px-4 py-2">{item.appliedAt}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setSelectedCase(item)}
                    className="text-gray-500 hover:text-gray-900 p-1 rounded transition-colors"
                  >
                    <FaEye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedCase && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">匯率審核詳情</h2>
            <p className="mb-2">貨幣對：{selectedCase.currencyPair}</p>
            <p className="mb-2">
              匯率變更：{selectedCase.beforeRate} →{" "}
              <span className="text-red-500 font-bold">{selectedCase.afterRate}</span>
            </p>
            <p className="mb-4">申請人：{selectedCase.applicant}</p>

            <div className="mb-4">
              <label className="block font-bold mb-2">審核結果</label>
              {["通過", "駁回"].map((option) => (
                <label key={option} className="mr-4">
                  <input
                    type="radio"
                    name="reviewResult"
                    value={option}
                    checked={reviewResult === option}
                    onChange={(e) => setReviewResult(e.target.value)}
                    className="mr-1"
                  />
                  {option}
                </label>
              ))}
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-2">備註</label>
              <textarea
                rows="4"
                className="w-full border border-gray-300 rounded p-2"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="請填寫審核意見..."
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedCase(null)}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              >
                取消
              </button>
              <button
                onClick={handleReviewSubmit}
                className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700"
              >
                送出審核
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ExchangeSettings() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">參數設定</h2>
      <select className="border p-2 rounded w-full text-gray-700">
        <option>USD</option>
        <option>VND</option>
        <option>IDR</option>
      </select>
      <input
        type="number"
        className="border p-2 rounded w-full text-gray-700"
        placeholder="設定變動範圍 (%)"
      />
      <div className="flex items-center gap-2">
        <label className="text-gray-700">風險通知</label>
        <input type="checkbox" />
      </div>
      <Button>儲存設定</Button>
    </div>
  );
}
