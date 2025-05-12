"use client";
import { useState } from "react";
import { Loader, PageLayout, PageTitle } from "@/components/ui";

export default function AppManagement() {
	const [isLoading, setIsLoading] = useState(false);

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

	if (isLoading) return <Loader fullScreen />;
	return (
		<>
			<PageLayout>
				<PageTitle title="App 會員管理" />
				<div className="mt-5">
					<div className="overflow-x-auto w-full">
						<table className="min-w-full bg-white border border-gray-200">
							<thead>
								<tr className="bg-gray-900 text-white">
									<th className="px-4 py-2 ">編號</th>
									<th className="px-4 py-2 ">帳號</th>
									<th className="px-4 py-2 ">電話號碼</th>
									<th className="px-4 py-2 ">Email</th>
									<th className="px-4 py-2 ">啟用</th>
									<th className="px-4 py-2 ">操作</th>
								</tr>
							</thead>
							<tbody>
								{/* {admins && admins.map((admin, index) => (
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
								))} */}
							</tbody>
						</table>
					</div>
				</div>
			</PageLayout>
		</>
	);
}