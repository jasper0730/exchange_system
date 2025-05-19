"use client";
import { useEffect, useState } from "react";
import { Loader, PageLayout, PageTitle } from "@/components/ui";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { AdminModal } from "@/components/pages/AdminManagement";
import Swal from "sweetalert2";
import { useAuthStore } from "@/store";
import { usePathname } from "next/navigation";
import { Button, Dropdown, IconButton, SearchBar } from "@/components/common";
import CommonTable, { NoTableData, Table, Tbody, TbodyTr, Td, Th, Thead, TheadTr } from "@/components/ui/CommonTable";


export default function AdminManagement() {
	const [isLoading, setIsLoading] = useState(true);
	const [admins, setAdmins] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [activeStatus, setActiveStatus] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState("create");
	const [editAdmin, setEditAdmin] = useState(null);
	const [filteredAdmins, setFilteredAdmins] = useState([]);
	// 權限
	const pathname = usePathname();
	const { routes } = useAuthStore();
	const segments = pathname.split("/").filter(Boolean);
	const pageKey = segments[0];
	const current = routes?.[pageKey];
	const readMode = current === "readonly";

	// 取的所有後台使用這資料
	const fetchData = async () => {
		try {
			const response = await fetch("/api/admin");
			const result = await response.json();
			if (!response.ok) {
				throw new Error(result.message || "發生未知錯誤");
			}
			console.log(result);
			if (result.ResultCode === 0) {
				setAdmins(result.Admins);
				setFilteredAdmins(result.Admins);
			} else {
				throw new Error(result.message || "資料取得失敗");
			}
		} catch (error) {
			const ppp = await error;
			console.log(ppp);
			// console.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};
	// 搜尋
	const handleSearch = () => {
		const keyword = searchValue.toLowerCase();
		const results = admins.filter(admin => {
			const matchKeyword =
				admin.Account.toLowerCase().includes(keyword);

			const matchStatus =
				activeStatus === "" ||
				(activeStatus === "啟用" && admin.Status) ||
				(activeStatus === "停用" && !admin.Status);

			return matchKeyword && matchStatus;
		});
		setFilteredAdmins(results);
	};
	// 清空
	const handleClear = () => {
		setSearchValue("");
	};
	// 建立 or 編輯
	const handleSubmit = async (payload) => {
		console.log(payload);
		try {
			setIsLoading(true);
			const apiUrl = modalMode === "create" ? "/api/admin" : `/api/admin/${editAdmin.id}`;
			const method = modalMode === "create" ? "POST" : "PUT";
			let role;
			switch (payload.Role) {
				case "Migrant":
					role = 1;
					break;
				case "Auditor":
					role = 2;
					break;
				case "Admin":
					role = 3;
					break;
				default:
					break;
			}
			const response = await fetch(apiUrl, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					Account: payload.Account,
					Role: role,
					Email: payload.Email,
					Status: payload.Status
				}),
			});

			const result = await response.json();

			if (!response.ok || result.ResultCode !== 0) {
				throw new Error(result.Message || "API錯誤");
			}

			await fetchData();
			closeModal();

			Swal.fire({
				icon: "success",
				title: `${modalMode === "create" ? "新增" : "編輯"}成功`,
				timer: 1500,
				showConfirmButton: false,
			});
		} catch (error) {
			console.error(error.message);
			Swal.fire({
				icon: "error",
				title: `${modalMode === "create" ? "新增" : "編輯"}失敗`,
				text: error.message || "發生未知錯誤"
			});
		} finally {
			setIsLoading(false);
		}
	};
	// 刪除
	const handleDelete = (id) => {
		// 打api更新資料
		// fetchData 更新畫面
	};
	// 打開建立Modal
	const openCreateModal = () => {
		setModalMode("create");
		setEditAdmin(null);
		setIsModalOpen(true);
	};
	// 打開編輯Modal
	const openEditModal = (admin) => {
		setModalMode("edit");
		setEditAdmin(admin);
		setIsModalOpen(true);
	};
	// 關閉Modal
	const closeModal = () => {
		setIsModalOpen(false);
		setEditAdmin(null);
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (isLoading) return <Loader fullScreen />;
	return (
		<>
			<PageLayout>
				<PageTitle title="後台使用者管理" />
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
						<div className="flex flex-col gap-2 flex-1">
							<p className="text-gray-900">啟用狀態</p>
							<Dropdown
								value={activeStatus}
								onChange={setActiveStatus}
								options={["啟用", "停用"]}
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
						<CommonTable >
							<Table>
								<Thead>
									<TheadTr>
										<Th className="w-[10%]">編號</Th>
										<Th className="w-[45%]">帳號</Th>
										<Th className="w-[20%]">權限</Th>
										<Th className="w-[10%]">啟用</Th>
										<Th className="w-[15%]">操作</Th>
									</TheadTr>
								</Thead>
								<Tbody>
									{filteredAdmins.length > 0 ? filteredAdmins.map((admin, index) => (
										<TbodyTr key={admin.Id}>
											<Td>{index + 1}</Td>
											<Td>{admin.Account}</Td>
											<Td>{admin.Role}</Td>
											<Td>
												<button
													type="button"
													title={admin.Status ? "啟用" : "停用"}
													className="text-gray-500 hover:text-gray-900 p-1 rounded transition-colors"
												>
													{admin.Status ? (
														<FiCheckCircle size={24} className="text-green-500" />
													) : (
														<FiXCircle size={24} className="text-red-500" />
													)}
												</button>
											</Td>
											<Td className="flex items-center gap-4">
												<IconButton
													type="button"
													title="編輯"
													style="edit"
													onClick={() => openEditModal(admin)}
													disabled={readMode}
												/>
												<IconButton
													type="button"
													title="刪除"
													style="delete"
													onClick={() => handleDelete(admin.Id)}
													disabled={readMode}
												/>
											</Td>
										</TbodyTr>
									))
										: <NoTableData colSpan={5} />
									}
								</Tbody>
							</Table>
						</CommonTable>
					</div>
				</div>
			</PageLayout>
			<AdminModal
				isOpen={isModalOpen}
				onClose={closeModal}
				onSubmit={handleSubmit}
				mode={modalMode}
				data={editAdmin} />
		</>

	);
};;