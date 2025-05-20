"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Loader, PageLayout, PageTitle } from "@/components/ui";
import { PermissionModal } from "@/components/pages/PermissionManagement";
import Swal from "sweetalert2";
import { Button, IconButton, SearchBar } from "@/components/common";
import CommonTable, { NoTableData, Table, Tbody, TbodyTr, Td, Th, Thead, TheadTr } from "@/components/ui/CommonTable";
import { useAuthStore } from "@/store";

export default function PermissionManagement() {

  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editGroup, setEditGroup] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredGroups, setFilteredGroups] = useState([]);
  // 權限
  const pathname = usePathname();
  const { routes } = useAuthStore();
  const segments = pathname.split("/").filter(Boolean);
  const pageKey = segments[0];
  const current = routes?.[pageKey];
  const readMode = current === "readonly";

  // 取得群組資料
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/groups");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(response.message || "HTTP 錯誤");
      }

      if (result.ResultCode === 0) {
        setGroups(result.data);
        setFilteredGroups(result.data);
      } else {
        throw new Error(result.message || "資料取得失敗");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  // 搜尋
  const handleSearch = () => {
    const keyword = searchValue.toLowerCase();
    const results = groups.filter(group => {
      const matchKeyword = group.name.toLowerCase().includes(keyword);

      return matchKeyword;
    });
    setFilteredGroups(results);
  };
  // 清空
  const handleClear = () => {
    setSearchValue("");
  };
  // 建立 or 編輯
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
        throw new Error(result.message || "HTTP 錯誤");
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
  // 開啟建立Modal
  const openCreateModal = () => {
    setModalMode("create");
    setEditGroup(null);
    setIsModalOpen(true);
  };
  // 開啟編輯Modal
  const openEditModal = (group) => {
    setModalMode("edit");
    setEditGroup(group);
    setIsModalOpen(true);
  };
  // 關閉Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditGroup(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <Loader fullScreen />;
  return (
    <>
      <PageLayout>
        <PageTitle title="權限管理" />
        <div className="mt-5">
          <div className="flex justify-end gap-2">
            <Button style="clear" onClick={handleClear}>清空</Button>
            <Button onClick={handleSearch}>搜尋</Button>
          </div>
          <div className="mt-2 flex items-center gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <p className="text-gray-900">關鍵字搜尋</p>
              <SearchBar
                value={searchValue || ""}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <Button
              onClick={openCreateModal}
              disabled={readMode}
            >
              新增
            </Button>
          </div>
          <div className="mt-5">
            <CommonTable>
              <Table>
                <Thead>
                  <TheadTr>
                    <Th className="w-[10%]">編號</Th>
                    <Th className="w-[80%]">群組名稱</Th>
                    <Th className="w-[10%]">操作</Th>
                  </TheadTr>
                </Thead>
                <Tbody>
                  {filteredGroups.length > 0 ? filteredGroups.map((group, idx) => (
                    <TbodyTr key={group.id}>
                      <Td>{idx + 1}</Td>
                      <Td>{group.name}</Td>
                      <Td className="flex gap-4">
                        <IconButton
                          type="button"
                          title="編輯"
                          style="edit"
                          onClick={() => openEditModal(group)}
                          disabled={readMode}
                        />
                      </Td>
                    </TbodyTr>
                  ))
                    : <NoTableData colSpan={3} />
                  }
                </Tbody>
              </Table>
            </CommonTable>
          </div>
        </div>
      </PageLayout >
      <PermissionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        mode={modalMode}
        data={editGroup} />
    </>
  );
}
