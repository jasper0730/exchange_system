import { useEffect, useState } from "react";
import { Button, CloseButton, Dropdown, Input, Modal } from "@/components/common";
import { formatDate } from "@/utils/format";

const roleOptions = ["正常", "未生效", "註冊待審", "補件待審", "審核中", "驗證失敗"];
export default function AppModal({ data, isOpen, onClose, onSubmit }) {
  const [userStatus, setUserStatus] = useState("");
  const isValid = userStatus !== "";
  const handleSubmit = () => {
    console.log("儲存資料：");
    onClose();
    // onSubmit();
  };

  useEffect(() => {
    if (data) {
      setUserStatus(data.remark);
    }
  }, [data]);
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="p-10 max-w-[700px] w-full rounded-lg shadow-lg bg-white relative"
        onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} />
        <h2 className="text-2xl font-bold mb-10 text-gray-900 text-center">會員資料</h2>
        <div className="space-y-5">
          <div>
            <p className="text-lg font-bold mb-2">帳號</p>
            <p>{data.account}</p>
          </div>
          <div>
            <p className="text-lg font-bold mb-2">Email</p>
            <p>{data.email}</p>
          </div>
          <div>
            <p className="text-lg font-bold mb-2">註冊日期</p>
            <p>{formatDate(data.createTime)}</p>
          </div>
          <div>
            <p className="text-lg font-bold mb-2">會員狀態</p>
            <div className="relative">
              <Dropdown
                value={userStatus}
                options={roleOptions}
                onChange={setUserStatus}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-10">
          <Button
            style="cancel"
            onClick={onClose}
          >
            取消
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isValid}
          >
            儲存
          </Button>
        </div>
      </div>
    </Modal>
  );
}
