import { useState } from "react";
import { Button, CloseButton, Modal, Radio, Textarea } from "@/components/common";

export default function ReviewModal({ data, isOpen, onClose, onSubmit }) {
  const [reviewResult, setReviewResult] = useState("");
  const [remark, setRemark] = useState("");
  const isValid = reviewResult !== "";
  const handleSubmit = () => {
    onSubmit({ reviewResult, remark });
    setReviewResult("");
    setRemark("");
  };
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="p-10 max-w-[700px] w-full rounded-lg shadow-lg bg-white relative"
        onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} />
        <h2 className="text-xl font-bold mb-4">匯率審核詳情</h2>
        <p className="mb-2">貨幣對：{data.currencyPair}</p>
        <p className="mb-2">
          匯率變更：{data.beforeRate} →{" "}
          <span className="text-red-500 font-bold">{data.afterRate}</span>
        </p>
        <p className="mb-4">申請人：{data.applicant}</p>
        <div className="mb-4">
          <div className="font-bold mb-2">審核結果</div>
          <div className="flex items-center gap-4">
            {["通過", "駁回"].map((option) => (
              <div key={option} className="flex gap-2 items-center">
                <Radio
                  name="reviewResult"
                  value={option}
                  checked={reviewResult === option}
                  onChange={(e) => setReviewResult(e.target.value)}
                  className="mr-1"
                />
                {option}
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <p className="font-bold mb-2">備註</p>
          <Textarea
            rows="4"
            value={remark || ""}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="請填寫審核意見..."
          />
        </div>
        <div className="flex justify-end gap-4">
          <Button
            style="cancel"
            onClick={onClose}
          >
            取消
          </Button>
          <Button
            disabled={!isValid}
            onClick={handleSubmit}
          >
            送出審核
          </Button>
        </div>
      </div>
    </Modal>
  );
}
