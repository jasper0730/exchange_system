"use client";
import { useEffect, useState } from "react";
import { Loader, PageLayout, PageTitle } from "@/components/ui";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { AdminModal } from "@/components/pages/AdminManagement";
import Swal from "sweetalert2";


export default function AdminManagement() {
	const [isLoading, setIsLoading] = useState(true);
	const [admins, setAdmins] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState("create");
	const [editAdmin, setEditAdmin] = useState(null);

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

	const toggleStatus = async (id) => {
		setAdmins((prev) =>
			prev.map((admin) =>
				admin.Id === id
					? { ...admin, Status: !admin.Status }
					: admin
			)
		);
		// 打API
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

	const handleDelete = (id) => {
		console.log("刪除");
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

	// if (isLoading) return <Loader fullScreen />;
	return (
		<>
			<PageLayout>
				<PageTitle title="後台使用者管理" />
				<div className="mt-5">
					<div className="flex justify-end">
						<button
							type="button"
							className="bg-gray-400 hover:bg-gray-900 text-white font-semibold px-4 py-2 rounded duration-300 cursor-pointer"
							onClick={openCreateModal}
						>
							新增
						</button>
					</div>
					<div className="mt-5">
						<div className="overflow-x-auto w-full">

							<table className="min-w-full bg-white border border-gray-200">
								<thead>
									<tr className="bg-gray-900 text-white">
										<th className="px-4 py-2 ">編號</th>
										<th className="px-4 py-2 ">帳號</th>
										<th className="px-4 py-2 ">權限</th>
										<th className="px-4 py-2 ">啟用</th>
										<th className="px-4 py-2 ">操作</th>
									</tr>
								</thead>
								<tbody>
									{isLoading ? (
										<tr>
											<td colSpan="5">
												<Loader page />
											</td>
										</tr>
									) : (
										admins.map((admin, index) => (
											<tr key={admin.Id} className="text-center">
												<td className="px-4 py-2">{index + 1}</td>
												<td className="px-4 py-2">{admin.Account}</td>
												<td className="px-4 py-2">{admin.Role}</td>
												<td className="px-4 py-2">
													<button
														type="button"
														title={admin.Status ? "啟用" : "停用"}
														className="text-gray-500 hover:text-gray-900 p-1 rounded transition-colors cursor-pointer"
														onClick={() => toggleStatus(admin.Id)}
													>
														{admin.Status ? (
															<MdToggleOn size={30} className="text-green-500" />
														) : (
															<MdToggleOff size={30} className="text-gray-400" />
														)}
													</button>
												</td>
												<td className="px-4 py-2 flex justify-center items-center gap-4">
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
												</td>
											</tr>
										))
									)}
								</tbody>
							</table>


						</div>
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