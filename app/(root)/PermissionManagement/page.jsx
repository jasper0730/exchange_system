"use client";
import { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { PageLayout, PageTitle, Loader } from "@/components/ui";

const url = process.env.NEXT_PUBLIC_API_URL;
export default function PermissionManagement() {
  const [searchValue, setSearchValue] = useState("");
  const [groups, setGroups] = useState([
    { id: 1, name: '管理員', permission: '啟用' },
    { id: 2, name: '一般使用者', permission: '唯讀' },
    { id: 3, name: '訪客', permission: '關閉' },
  ]);

  const handlePermissionChange = (id, newPermission) => {
    setGroups(prev => prev.map(g => g.id === id ? { ...g, permission: newPermission } : g));
  };

  return (
    <PageLayout>
      <PageTitle title="權限管理" />
      <div className="mt-5">
        <div className="flex items-center">
          <p className="text-gray-600 whitespace-nowrap mr-4 text-xl font-bold">
            搜尋群組
          </p>
          <div className="flex items-center border rounded w-full max-w-full px-2 bg-white">
            <input
              type="text"
              placeholder="請輸入關鍵字"
              className="flex-1 px-2 py-2 outline-none bg-transparent"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <FaSearch className="h-5 w-5 text-gray-400 hover:text-gray-900 cursor-pointer ml-2 duration-300" />
          </div>
        </div>
				<div className="mt-5">
					<div className="overflow-x-auto w-full">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="px-4 py-2 ">編號</th>
                  <th className="px-4 py-2 ">群組名稱</th>
                  <th className="px-4 py-2 ">權限</th>
                  <th className="px-4 py-2 ">操作</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group, idx) => (
                  <tr key={group.id} className="text-center hover:bg-gray-50">
                    <td className="px-4 py-2 ">{idx + 1}</td>
                    <td className="px-4 py-2 ">{group.name}</td>
                    <td className="px-4 py-2 ">
                      <select
                        className="border rounded px-2 py-1"
                        value={group.permission}
                        onChange={e => handlePermissionChange(group.id, e.target.value)}
                      >
                        <option value="啟用">啟用</option>
                        <option value="唯讀">唯讀</option>
                        <option value="關閉">關閉</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 flex justify-center items-center gap-4">
                      <button type="button" title="編輯" className="text-gray-500 hover:text-gray-900 p-1 rounded transition-colors cursor-pointer">
                        <FaEdit size={18} />
                      </button>
                      <button type="button" title="刪除" className="text-gray-500 hover:text-gray-900 p-1 rounded transition-colors cursor-pointer">
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

					</div>

				</div>
      </div>
    </PageLayout>
  );
}
