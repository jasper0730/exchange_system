import { Button, Checkbox, Dropdown, Input } from "@/components/common";
import { useState } from "react";

export default function ExchangeSettings() {
  const [currency, setCurremcy] = useState("");
  const [range, setRange] = useState("");
  const [notify, setNotify] = useState(false);

  const handleSubmit = () => {
    console.log("送出", notify, range, currency);
  };
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold">參數設定</h2>
      <div className="flex flex-col gap-2">
        <p className="whitespace-nowrap">幣別</p>
        <Dropdown
          onChange={setCurremcy}
          value={currency}
          options={[
            "USD", "VND", "IDR"
          ]}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="whitespace-nowrap">變動範圍</p>
        <Input
          type="number"
          placeholder="設定變動範圍 (%)"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <p>風險通知</p>
        <Checkbox
          checked={notify}
          onChange={(e) => setNotify(e.target.checked)} />
      </div>
      <Button onClick={handleSubmit}>儲存設定</Button>
    </div>
  );
}