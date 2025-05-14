import { useState } from "react";
import { Button, CloseButton, Dropdown, Modal, Textarea } from "@/components/common";

const statusOptions = ["待處理", "已回覆"];

export default function FeedbackModal({ data, isOpen, onClose, onSubmit }) {
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("");
  const handleSubmit = () => {
    onSubmit({ reply, status });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="p-10 max-w-[700px] w-full rounded-lg shadow-lg bg-white relative"
        onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} />
        <h2 className="text-xl font-bold mb-4">反饋詳情</h2>
        <p className="mb-2"><strong>會員名稱：</strong>{data?.member}</p>
        <p className="mb-2"><strong>反饋內容：</strong>{data?.content}</p>
        <div className="my-4">
          <p className="mb-2 font-bold">回覆內容</p>
          <Textarea
            rows="4"
            placeholder="請輸入回覆內容..."
            value={reply || ""}
            onChange={(e) => setReply(e.target.value)}
          />
        </div>
        <div className="my-4">
          <p className="mb-2 font-bold">狀態標記</p>
          <Dropdown value={status} onChange={setStatus} options={statusOptions} />
        </div>
        <div className="flex justify-end gap-2">
          <Button style="clear" onClick={onClose}>取消</Button>
          <Button onClick={handleSubmit}>送出回覆</Button>
        </div>
      </div>
    </Modal>
  );
}