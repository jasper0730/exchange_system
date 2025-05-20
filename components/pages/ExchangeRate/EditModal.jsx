import { useState } from "react";
import { Button, CloseButton, Dropdown, Input, Modal } from "@/components/common";
import Swal from "sweetalert2";

export default function EditModal({ data, isOpen, onClose, onSubmit }) {
  const [isLoading, setIsLoading] = useState(false);
  const [fee, setFee] = useState("");
  const [rateCount, setRateCount] = useState("");
  const [isCancel, setIsCancel] = useState(false)
  const isValid = rateCount !== "";

  const handleSubmit = async () => {
    if (!isValid) return;
    try {
      setIsLoading(true);
      const body = {
        CountryId: current.CountryId,
        ExchangeRateMargin: rateCount,
        UsdExchangeRate: data.TwdToUsdRate,
        TargetExchangeRate: current.ExchangeRate,
        Fee: fee
      };
      const response = await fetch("/api/rate/setting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(response.statusText || "HTTP 錯誤");
      }
      const result = await response.json();
      if (result.ResultCode === 0) {
        Swal.fire({
          icon: "success",
          title: "送出成功",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          handleClose();
        });
      } else {
        throw new Error("送出失敗");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "送出失敗",
        text: error || "發生未知錯誤",
        timer: 1500,
        showConfirmButton: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    handleClear();
    onClose();
  };
  const handleClear = () => {
    setFee("");
    setRateCount("");
  };


  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div
        className="p-10 max-w-[500px] w-full rounded-lg shadow-lg bg-white relative"
        onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose} />
        <h2 className="text-2xl font-bold mb-10 text-gray-900 text-center">修改參數設定</h2>
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
              min="0"
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="whitespace-nowrap w-1/2">
              手續費：
            </p>
            <Input
              type="number"
              className="w-1/2"
              placeholder="設定手續費"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              min="0"
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="whitespace-nowrap w-1/2">
              參數異動：
            </p>
            {current?.ExchangeRateMargin && (
              <div className="flex gap-2">
                <del className="font-bold">{current.ExchangeRateMargin}</del>→
                <span className="text-red-500 font-bold">{rateCount}</span>
              </div>
            )}
          </div>

        </div>
        <div className="flex justify-center gap-4 mt-10">
          <Button
            type="button"
            onClick={handleClose}
            style="cancel"
          >
            取消
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid || isLoading}
          >
            送出
          </Button>
        </div>
      </div>
    </Modal>
  );
}
