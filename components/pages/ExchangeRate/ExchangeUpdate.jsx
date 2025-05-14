import { useState } from "react";
import { Button, Dropdown, Input } from "@/components/common";
export default function ExchangeUpdate() {
  const [type, setType] = useState("");
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">匯率更新</h2>
      <Dropdown
        options={[
          "銀行",
          "市場報價"
        ]}
        value={type}
        onChange={setType}
      />
      <p className="text-gray-700">貨幣對：TWD/USD</p>
      <Input
        type="number"
        placeholder="請輸入匯率"
      />
      <p className="text-gray-500">上次更新時間：2025/03/25 負責人：Jasper</p>
      <Button>確認更新</Button>
    </div>
  );
}