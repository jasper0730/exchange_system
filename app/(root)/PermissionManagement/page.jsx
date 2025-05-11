"use client";
import { useEffect, useState } from "react";
import { FaSearch, FaEdit } from "react-icons/fa";
import { Loader, PageLayout, PageTitle } from "@/components/ui";
import { PermissionModal } from "@/components/pages/PermissionManagement";
import Swal from "sweetalert2";

export default function PermissionManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editGroup, setEditGroup] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/groups");
      const result = await res.json();
      if (result.ok) {
        setGroups(result.data);
      } else {
        throw new Error("沒有資料");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (payload) => {
    const apiUrl = modalMode === "create" ? "/api/groups" : `/api/groups/${editGroup.id}`;
    const method = modalMode === "create" ? "POST" : "PUT";

    const res = await fetch(apiUrl, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      await fetchData();
      closeModal();
    } else {
      Swal.fire({
        icon: "error",
        title: `${modalMode === "create" ? "新增" : "編輯"}失敗`,
      });
    }
  };

  const openCreateModal = () => {
    setModalMode("create");
    setEditGroup(null);
    setIsModalOpen(true);
  };

  const openEditModal = (group) => {
    setModalMode("edit");
    setEditGroup(group);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditGroup(null);
  };
  if (isLoading) return <Loader fullScreen />;
  return (
    <>
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
          <button
            type="button"
            className="mt-5 bg-gray-400 hover:bg-gray-900 text-white font-semibold px-4 py-2 rounded duration-300 cursor-pointer"
            onClick={openCreateModal}
          >
            新增群組
          </button>
          <div className="mt-5">
            <div className="overflow-x-auto w-full">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="px-4 py-2 ">編號</th>
                    <th className="px-4 py-2 ">群組名稱</th>
                    <th className="px-4 py-2 ">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map((group, idx) => (
                    <tr key={group.id} className="text-center">
                      <td className="px-4 py-2 ">{idx + 1}</td>
                      <td className="px-4 py-2 ">{group.name}</td>
                      <td className="px-4 py-2 flex justify-center items-center gap-4">
                        <button type="button" title="編輯" className="text-gray-500 hover:text-gray-900 p-1 rounded transition-colors cursor-pointer"
                          onClick={() => openEditModal(group)}>
                          <FaEdit size={18} />
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
      <PermissionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        mode={modalMode}
        data={editGroup} />
    </>
  );
}
