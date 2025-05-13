"use client";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Loader, PageLayout, PageTitle } from "@/components/ui";
import { PermissionModal } from "@/components/pages/PermissionManagement";
import Swal from "sweetalert2";
import { Button } from "@/components/common";

export default function PermissionManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editGroup, setEditGroup] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/groups");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(response.message || "API錯誤");
      }

      if (result.ResultCode === 0) {
        setGroups(result.data);
      } else {
        throw new Error(result.message || "資料取得失敗");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (payload) => {
    try {
      setIsLoading(true);
      const apiUrl = modalMode === "create" ? "/api/groups" : `/api/groups/${editGroup.id}`;
      const method = modalMode === "create" ? "POST" : "PUT";

      const response = await fetch(apiUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "API錯誤");
      }
      if (result.ResultCode === 0) {
        fetchData();
        closeModal();
        Swal.fire({
          icon: "success",
          title: `${modalMode === "create" ? "新增" : "編輯"}成功`,
        });
      } else {
        throw new Error(result.Message || "");
      }
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        icon: "error",
        title: `${modalMode === "create" ? "新增" : "編輯"}失敗`,
        text: error.message || "格式錯誤"
      });
    } finally {
      setIsLoading(false);
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
        <div className="mt-10">
          <div className="flex justify-end">
            <Button
              onClick={openCreateModal}
            >
              新增
            </Button>
          </div>
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
