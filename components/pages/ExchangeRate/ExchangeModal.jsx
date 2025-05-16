import { useState } from "react";
import { Button, CloseButton, Dropdown, Input, Modal } from "@/components/common";

export default function ExchangeModal({ data, isOpen, onClose, onSubmit }) {
  const [currency, setCurrency] = useState("");
  const [rateCount, setRateCount] = useState("");

  const handleSave = () => {
    // if (isValid) return;
    console.log("儲存資料：", admin);
    onSubmit({ conutry, rateCount });
  };
  const rateOptions = data.map(item => item.CurrencyCode);
  const current = data.map(item => item.CurrencyCode === currency);
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="p-10 max-w-[500px] w-full rounded-lg shadow-lg bg-white relative"
        onClick={(e) => e.stopPropagation()}>
        <CloseButton onClose={onClose} />
        <h2 className="text-2xl font-bold mb-10 text-gray-900 text-center">參數設定</h2>
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <p className="whitespace-nowrap w-1/2">
              幣別：
            </p>
            <div className="w-1/2">
              <Dropdown
                value={currency}
                onChange={setCurrency}
                options={rateOptions}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="whitespace-nowrap w-1/2">
              變動範圍：
            </p>
            <Input
              type="number"
              className="w-1/2"
              placeholder="設定變動範圍 (%)"
              value={rateCount}
              onChange={(e) => setRateCount(e.target.value)}
            />
          </div>
        </div>
        <p className="mb-2">
          匯率變更：{current.ExchangeRateMargin} →
          <span className="text-red-500 font-bold">{rateCount}</span>
        </p>

        <div className="flex justify-center gap-4 mt-10">
          <Button
            type="button"
            onClick={onClose}
            style="cancel"
          >
            取消
          </Button>
          <Button
            type="button"
            onClick={handleSave}
          // disabled={isValid}
          >
            儲存
          </Button>
        </div>
      </div>
    </Modal>
  );
}
