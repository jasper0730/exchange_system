import { useEffect, useState } from "react";
import { Modal } from "@/components/common";
import { menuItems } from "@/lib/menuItems";
import { AiOutlineClose } from "react-icons/ai";

export default function PermissionModal({ data, isOpen, onClose, onSubmit, mode }) {
  const [groupName, setGroupName] = useState("");
  const [permissions, setPermissions] = useState({});


  useEffect(() => {
    if (mode === "edit" && data) {
      setGroupName(data.name);
      setPermissions(data.permissions);
    } else {
      setGroupName("");
      setPermissions(
        menuItems.reduce((acc, item) => {
          acc[item.href] = "disabled";
          return acc;
        }, {})
      );
    }
  }, [mode, data, isOpen]);
  const isValid = groupName.trim() === "";

  const handlePermissionChange = (feature, value) => {
    setPermissions((prev) => ({ ...prev, [feature]: value }));
  };

  const handleSave = () => {
    if (isValid) return;
    console.log("儲存資料：", { groupName, permissions });
    onSubmit({ groupName, permissions });
    // setGroupName("");
    // onClose();
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
        <h2 className="text-2xl font-bold mb-10 text-gray-900">{mode === "create" ? "新增" : "編輯"}群組</h2>
        <div className="px-5">
          <div className="flex items-center gap-4 mb-5">
            <p className="whitespace-nowrap text-lg font-bold">群組名稱</p>
            <input
              type="text"
              className="border p-2 w-full rounded"
              placeholder="請輸入群組名稱"
              value={groupName ?? ""}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <div className="overflow-y-auto h-[50dvh]">
            <table className="min-w-full border border-gray-200 text-center">
              <thead>
                <tr className="bg-gray-600 text-white">
                  <th className="px-4 py-2 text-left">功能</th>
                  <th className="px-4 py-2">完整存取</th>
                  <th className="px-4 py-2">唯讀</th>
                  <th className="px-4 py-2">關閉</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item) => (
                  <tr key={item.href} >
                    <td className={`text-left px-4 py-2 text-gray-900`}>{item.label}</td>
                    {["enable", "readOnly", "disabled"].map((permissionItem) => (
                      <td key={permissionItem} className="px-4 py-2">
                        <input
                          type="radio"
                          name={item.href}
                          checked={permissions[item.href] === permissionItem}
                          onChange={() => handlePermissionChange(item.href, permissionItem)}
                          className="form-radio accent-gray-900 h-5 w-5 cursor-pointer"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
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
