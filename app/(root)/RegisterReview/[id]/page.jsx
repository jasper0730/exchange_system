"use client";
import { Button, Radio, Textarea } from "@/components/common";
import { PageLayout, PageTitle } from "@/components/ui";
import { useAuthStore } from "@/store";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function ReviewDetail() {
  const [reviewStatus, setReviewStatus] = useState({});
  const [remark, setRemark] = useState("");
  const [history, setHistory] = useState(["2025/03/24 提出註冊申請", "2025/03/25 資料補件"]);
  // 權限
  const pathname = usePathname();
  const { routes } = useAuthStore();
  const segments = pathname.split("/").filter(Boolean);
  const pageKey = segments[0];
  const current = routes?.[pageKey];
  const readMode = current === "readonly";

  const fields = [
    { label: "姓名", value: "張先生" },
    { label: "國籍", value: "台灣" },
    { label: "出生日期", value: "1990/05/20" },
    { label: "身分證號碼", value: "A123456789" },
    { label: "發證日期", value: "2010/06/15" },
    { label: "發證地點", value: "台北市" },
  ];

  const handleStatusChange = (field, status) => {
    setReviewStatus(prev => ({ ...prev, [field]: status }));
  };
  const handleSubmit = () => {
    console.log(reviewStatus, remark);
  };

  return (
    <PageLayout>
      <PageTitle title="會員審核詳情" />
      <div className="flex justify-between items-start bg-white p-6 rounded shadow border border-gray-200 mb-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">張先生</h2>
          <p className="text-gray-700 mt-2">
            審核狀態：<span className="font-bold text-yellow-500">待審核</span>
          </p>
          <p className="text-gray-700">
            權限狀態：<span className="font-bold text-green-500">一般會員</span>
          </p>
        </div>
        <div className="w-1/3">
          <h3 className="text-lg font-bold mb-2">備註紀錄</h3>
          <div className="max-h-[200px] overflow-y-auto border p-3 rounded bg-gray-50">
            <ul className="text-gray-700 list-disc pl-5 space-y-1">
              {history.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex-1 space-y-4">
          {fields.map(({ label, value }) => (
            <div
              key={label}
              className="flex justify-between items-center bg-white p-4 rounded shadow border border-gray-200"
            >
              <div>
                <p className="text-gray-700 font-bold">{label}：</p>
                <p className="text-gray-700 mt-1">{value}</p>
              </div>
              <div className="flex gap-4 items-center">
                <Radio
                  name={label}
                  value="通過"
                  checked={reviewStatus[label] === "通過"}
                  onChange={() => handleStatusChange(label, "通過")}
                />
                通過
                <Radio
                  name={label}
                  value="未通過"
                  checked={reviewStatus[label] === "未通過"}
                  onChange={() => handleStatusChange(label, "未通過")}
                />
                未通過
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/2 bg-white p-6 rounded shadow border border-gray-200">
          <h3 className="text-lg font-bold mb-4">上傳文件</h3>
          <img
            src="https://picsum.photos/seed/picsum/300/200"
            alt="上傳文件"
            className="rounded border w-full object-fit mb-4"
          />
          <div className="flex gap-4 items-center justify-center">
            <Radio
              name="uploadedFile"
              value="通過"
              checked={reviewStatus["uploadedFile"] === "通過"}
              onChange={() => handleStatusChange("uploadedFile", "通過")}
            />
            通過
            <Radio
              name="uploadedFile"
              value="未通過"
              checked={reviewStatus["uploadedFile"] === "未通過"}
              onChange={() => handleStatusChange("uploadedFile", "未通過")}
            />
            未通過
          </div>
        </div>
      </div>
      <div className="mt-6 bg-white p-6 rounded shadow border border-gray-200">
        <h3 className="text-lg font-bold mb-2">審核備註</h3>
        <Textarea
          rows="4"
          placeholder="請輸入備註說明..."
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
        />
        <div className="flex gap-4 justify-center mt-4">
          <Button style="clear">取消</Button>
          <Button onClick={handleSubmit}>送出</Button>
        </div>
      </div>
    </PageLayout>
  );
}
