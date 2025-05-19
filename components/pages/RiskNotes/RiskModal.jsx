import { useEffect, useState } from "react";
import { Button, CloseButton, Dropdown, Input, Modal } from "@/components/common";
import { formatDate } from "@/utils/format";

const riskOptions = ["會員註冊時提供之身分證明等相關文件疑似偽造或變造", "對於會員註冊資料之真實性或妥適性有所懷疑時", "依明顯事證認有必要再行確認會員身分之情形", "會員交易時距前次交易已逾一年", "同一行動電話號碼遭不同會員用於身分確認程序", "居留證期限過期超過三個月者"];
export default function RiskModal({ data, isOpen, onClose, onSubmit }) {
  const [userStatus, setUserStatus] = useState("");
  const isValid = userStatus !== "";
  const handleSave = () => {
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
        <h2 className="text-2xl font-bold mb-10 text-gray-900 text-center">會員風險註記</h2>
        <div className="space-y-5">
          <div>
            <p className="text-lg font-bold mb-2">帳號</p>
            <p>{data.account}</p>
          </div>
          <div>
            <p className="text-lg font-bold mb-2">風險註記</p>
            <ul className="flex flex-col gap-2">
              <li className="bg-gray-50 p-3">
                <p>會員交易時距前次交易已逾一年</p>
                <p className="text-right text-sm">日期：2024/12/16</p>
              </li>
              <li className="bg-gray-50 p-3">
                <p>同一行動電話號碼遭不同會員用於身分確認程序。</p>
                <p className="text-right text-sm">日期：2024/11/14</p>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-lg font-bold mb-2">新增註記</p>
            <div className="relative">
              <Dropdown
                value={userStatus}
                options={riskOptions}
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
            onClick={handleSave}
            disabled={!isValid}
          >
            儲存
          </Button>
        </div>
      </div>
    </Modal>
  );
}
