import { useState } from "react";
import { Button, CloseButton, Modal, Radio, Textarea } from "@/components/common";

export default function ReviewModal({ data, isOpen, onClose, onSubmit }) {
  const [reviewResult, setReviewResult] = useState("");
  const [remark, setRemark] = useState("");
  const isValid = reviewResult !== "";
  const handleSave = () => {
    // onSubmit({ reviewResult, remark });
    setReviewResult("");
    setRemark("");
    onClose();
  };
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="p-10 max-w-[700px] w-full rounded-lg shadow-lg bg-white relative"
        onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} />
        <h2 className="text-2xl font-bold mb-10 text-center">參數審核詳情</h2>
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <p className="whitespace-nowrap w-1/2">
              申請人：
            </p>
            <p className="w-1/2">
              david65497
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="whitespace-nowrap w-1/2">
              貨幣對：
            </p>
            <p className="w-1/2">
              IND
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="whitespace-nowrap w-1/2">
              參數異動：
            </p>
            <div className="flex gap-2">
              <span className="font-bold">0.00223</span>→
              <span className="text-red-500 font-bold">0.00225</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="whitespace-nowrap w-1/2">
              審核結果：
            </p>
            {["通過", "駁回"].map((option) => (
              <div key={option} className="flex gap-2 items-center">
                <Radio
                  value={option}
                  checked={reviewResult === option}
                  onChange={(e) => setReviewResult(e.target.value)}
                  className="mr-1"
                />
                {option}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold mb-2">備註</p>
            <Textarea
              rows="4"
              value={remark || ""}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="請填寫審核意見..."
            />
          </div>
        </div>
        <div className="mt-10 flex justify-center gap-4">
          <Button
            style="cancel"
            onClick={onClose}
          >
            取消
          </Button>
          <Button
            disabled={!isValid}
            onClick={handleSave}
          >
            儲存
          </Button>
        </div>
      </div>
    </Modal>
  );
}
