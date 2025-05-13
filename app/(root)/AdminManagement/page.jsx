"use client";
import { useEffect, useState } from "react";
import { Loader, PageLayout, PageTitle } from "@/components/ui";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FiSearch, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { AdminModal } from "@/components/pages/AdminManagement";
import Swal from "sweetalert2";
import { useAuthStore } from "@/store/authStore";
import { usePathname } from "next/navigation";
import { Button } from "@/components/common";
import CommonTable, { Table, Tbody, TbodyTr, Td, Th, Thead, TheadTr } from "@/components/ui/CommonTable";


export default function AdminManagement() {
	const pathname = usePathname();
	const [isLoading, setIsLoading] = useState(true);
	const [admins, setAdmins] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [statusFilter, setStatusFilter] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState("create");
	const [editAdmin, setEditAdmin] = useState(null);
	const { routes } = useAuthStore();
	const segments = pathname.split("/").filter(Boolean);
	const pageKey = segments[0];
	const current = routes?.[pageKey];
	const readMode = current === "readonly";
	const enableMode = current === "enable";

	console.log("enableMode", enableMode);
	console.log("readMode", readMode);

	const fetchData = async () => {
		try {
			const response = await fetch("/api/admin");
			const result = await response.json();
			if (!response.ok) {
				throw new Error(result.message || "API錯誤");
			}

			if (result.ResultCode === 0) {
				setAdmins(result.Admins);
			} else {
				throw new Error(result.message || "資料取得失敗");
			}
		} catch (error) {
			console.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async (payload) => {
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

	const handleDelete = (id) => {
		// 打api更新資料
		// fetchData 更新畫面
	};

	const openCreateModal = () => {
		setModalMode("create");
		setEditAdmin(null);
		setIsModalOpen(true);
	};

	const openEditModal = (admin) => {
		setModalMode("edit");
		setEditAdmin(admin);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setEditAdmin(null);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const filteredAdmins = admins.filter(admin => {
		const matchKeyword =
			admin.Account.toLowerCase().includes(searchValue.toLowerCase());

		const matchStatus =
			statusFilter === "" ||
			(statusFilter === "enabled" && admin.Status) ||
			(statusFilter === "disabled" && !admin.Status);

		return matchKeyword && matchStatus;
	});

	if (isLoading) return <Loader fullScreen />;
	return (
		<>
			<PageLayout>
				<PageTitle title="後台使用者管理" />
				<div className="mt-10">
					<div className="flex justify-between items-center">
						<div className="flex items-center gap-2">
							<div className="flex items-center border border-gray-300 rounded px-3 py-2 w-100 bg-white">
								<FiSearch className="text-gray-500 text-lg" />
								<input
									type="text"
									placeholder="請輸入關鍵字"
									className="ml-2 outline-none flex-1 text-gray-700"
									value={searchValue || ""}
									onChange={(e) => setSearchValue(e.target.value)}
								/>
							</div>
							<select
								value={statusFilter}
								onChange={(e) => setStatusFilter(e.target.value)}
								className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-700"
							>
								<option value="">
									啟用狀態
								</option>
								<option value="enabled">啟用</option>
								<option value="disabled">停用</option>
							</select>
						</div>
						<Button
							onClick={openCreateModal}
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
									{filteredAdmins && filteredAdmins.map((admin, index) => (
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
												<button
													type="button"
													title="編輯"
													className="text-gray-500 hover:text-gray-900 p-1 rounded transition-colors cursor-pointer"
													onClick={() => openEditModal(admin)}
												>
													<FaEdit size={18} />
												</button>
												<button
													type="button"
													title="刪除"
													className="text-gray-500 hover:text-red-600 p-1 rounded transition-colors cursor-pointer"
													onClick={() => handleDelete(admin.Id)}
												>
													<FaTrash size={18} />
												</button>
											</Td>
										</TbodyTr>
									))}
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