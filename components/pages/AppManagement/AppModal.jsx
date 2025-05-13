import { useEffect, useState } from "react";
import { Modal } from "@/components/common";
import { AiOutlineClose, AiOutlineDown } from "react-icons/ai";
import { MdToggleOn, MdToggleOff } from "react-icons/md";

export default function AppModal({ data, isOpen, onClose, onSubmit }) {



  const handleSave = () => {
    if (isValid) return;
    console.log("儲存資料：", admin);
    onSubmit(admin);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="p-10 max-w-[700px] w-full rounded-lg shadow-lg bg-white relative"
        onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-10 text-gray-900">會員</h2>
        <div className="space-y-5">
          <div>
            <p>姓名 :</p>
            <p>{data.name}</p>
          </div>
          <div>
            <label className="block text-lg font-bold mb-2">Email</label>
            <input
              type="email"
              className="border p-2 w-full rounded"
              placeholder="請輸入 Email"
              value={admin.Email ?? ""}
              onChange={(e) => setAdmin({ ...admin, Email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-lg font-bold mb-2">權限</label>
            <div className="relative">
              <select
                className="border p-2 w-full rounded appearance-none cursor-pointer"
                value={admin.Role}
                onChange={(e) => setAdmin({ ...admin, Role: e.target.value })}
              >
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <div className="absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none">
                <AiOutlineDown size={20} className="text-gray-500" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">帳號狀態</span>
            <button
              type="button"
              title={admin.Status ? "啟用" : "停用"}
              className="text-gray-500 hover:text-gray-900 p-1 rounded transition-colors cursor-pointer"
              onClick={() => setAdmin({ ...admin, Status: !admin.Status })}
            >
              {admin.Status ? (
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
