import { useEffect, useState } from "react";
import { CloseButton, Dropdown, Input, Modal } from "@/components/common";
import { MdToggleOn, MdToggleOff } from "react-icons/md";

const roleOptions = ["Admin", "Migrant", "Auditor"]; // 暫時用(需從DB拿

export default function AdminModal({ data, isOpen, onClose, onSubmit, mode }) {
  const [Account, setAccount] = useState("");
  const [Email, setEmail] = useState("");
  const [Status, setStatus] = useState("");
  const [Role, setRole] = useState("");


  useEffect(() => {
    if (mode === "edit" && data) {
      setAccount(data.Account);
      setEmail(data.Email);
      setStatus(data.Status);
      setRole(data.Role);
    } else {
      setAccount("");
      setEmail("");
      setStatus("");
      setRole("");
    }
  }, [mode, data, isOpen]);

  const isValid = Account?.trim() === "" || Email?.trim() === "";

  const handleSave = () => {
    if (isValid) return;
    onSubmit({
      Account, Email, Status, Role
    });
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="p-10 max-w-[700px] w-full rounded-lg shadow-lg bg-white relative"
        onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} />
        <h2 className="text-2xl font-bold mb-10 text-gray-900">{mode === "create" ? "新增" : "編輯"}使用者</h2>
        <div className="space-y-5">
          <div>
            <p className="text-lg font-bold mb-2">帳號</p>
            <Input
              placeholder="請輸入帳號"
              value={Account ?? ""}
              onChange={(e) => setAccount(e.target.value)}
            />
          </div>
          <div>
            <p className="text-lg font-bold mb-2">Email</p>
            <Input
              type="email"
              placeholder="請輸入 Email"
              value={Email ?? ""}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <p className="text-lg font-bold mb-2">權限</p>
            <div className="relative">
              <Dropdown
                value={Role}
                onChange={setRole}
                options={roleOptions}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">帳號狀態</span>
            <button
              type="button"
              title={Status ? "啟用" : "停用"}
              className="text-gray-500 hover:text-gray-900 p-1 rounded transition-colors cursor-pointer"
              onClick={() => setStatus(prev => !prev)}
            >
              {Status ? (
                <MdToggleOn size={30} className="text-green-500" />
              ) : (
                <MdToggleOff size={30} className="text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-10">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-900 rounded hover:bg-gray-100 cursor-pointer transition-colors"
          >
            取消
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-900 cursor-pointer disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-default transition-colors"
            disabled={isValid}
          >
            儲存
          </button>
        </div>
      </div>
    </Modal>
  );
}
