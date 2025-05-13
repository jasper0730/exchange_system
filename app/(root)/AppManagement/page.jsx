"use client";
import { useEffect, useState } from "react";
import { Loader, PageLayout, PageTitle } from "@/components/ui";
import { FiSearch } from "react-icons/fi";
import { MdToggleOff, MdToggleOn } from "react-icons/md";
import { FaEdit, FaTrash } from "react-icons/fa";
import { formatDate } from "@/utils/format";
import { SearchBar } from "@/components/common";

export default function AppManagement() {
	const [isLoading, setIsLoading] = useState(true);
	const [searchValue, setSearchValue] = useState("");
	const [activeStatus, setActiveStatus] = useState("");
	const [userStatus, setUserStatus] = useState("");
	const [users, setUsers] = useState([]);



	const fetchData = async () => {
		try {
			const response = await fetch("/api/user");
			const result = await response.json();
			if (!response.ok) {
				throw new Error(result.message || "API錯誤");
			}

			if (result.ResultCode === 0) {
				setUsers(result.getUser);
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

	const filteredUsers = users.filter(user => {
		const keyword = searchValue.toLowerCase();
		const matchKeyword = user.account.toLowerCase().includes(keyword);
		const matchActiveStatus =
			activeStatus === "" ||
			(activeStatus === "enabled" && user.status) ||
			(activeStatus === "disabled" && !user.status);
		const matchUserStatus = userStatus === "" || user.remark === userStatus;
		return matchKeyword && matchActiveStatus && matchUserStatus;

	});

	if (isLoading) return <Loader fullScreen />;
	return (
		<>
			<PageLayout>
				<PageTitle title="App 會員管理" />
				<div className="mt-10">
					<div className="flex items-center gap-2">
						<SearchBar
							placeholder="請輸入關鍵字"
							value={searchValue || ""}
							onChange={(e) => setSearchValue(e.target.value)}
						/>
						<select
							value={activeStatus}
							onChange={(e) => setActiveStatus(e.target.value)}
							className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-700"
						>
							<option value="">啟用狀態</option>
							<option value="enabled">啟用</option>
							<option value="disabled">停用</option>
						</select>
						<select
							value={userStatus}
							onChange={(e) => setUserStatus(e.target.value)}
							className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-700"
						>
							<option value="">會員狀態</option>
							<option value="正常">正常</option>
							<option value="未生效">未生效</option>
							<option value="註冊待審">註冊待審</option>
							<option value="補件待審">補件待審</option>
							<option value="審核中">審核中</option>
							<option value="驗證失敗-待補件">驗證失敗-待補件</option>
							<option value="限制使用">限制使用</option>
							<option value="黑名單">黑名單</option>
							<option value="註銷">註銷</option>
						</select>
					</div>
					<div className="mt-5">
						<div className="overflow-x-auto w-full">
							<table className="min-w-full bg-white border border-gray-200 text-left">
								<thead>
									<tr className="bg-gray-900 text-white">
										<th className="px-4 py-2 w-[10%]">編號</th>
										<th className="px-4 py-2 w-[30%]">帳號</th>
										<th className="px-4 py-2 w-[20%]">註冊日期</th>
										<th className="px-4 py-2 w-[15%]">狀態</th>
										<th className="px-4 py-2 w-[10%]">啟用</th>
										<th className="px-4 py-2 w-[15%]">操作</th>
									</tr>
								</thead>
								<tbody>
									{filteredUsers && filteredUsers.map((user, index) => (
										<tr key={user.userId}>
											<td className="px-4 py-2">{index + 1}</td>
											<td className="px-4 py-2">{user.account}</td>
											<td className="px-4 py-2">{formatDate(user.createTime)}</td>
											<td className="px-4 py-2">
												{user.remark}
											</td>
											<td className="px-4 py-2">
												<button
													type="button"
													title={user.status ? "啟用" : "停用"}
													className="text-gray-500 hover:text-gray-900 p-1 rounded transition-colors cursor-pointer"
													onClick={() => toggleStatus(user.userId)}
												>
													{user.status ? (
														<MdToggleOn size={30} className="text-green-500" />
													) : (
														<MdToggleOff size={30} className="text-gray-400" />
													)}
												</button>
											</td>
											<td className="px-4 py-2">
												<button
													type="button"
													title="編輯"
													className="text-gray-500 hover:text-gray-900 p-1 rounded transition-colors cursor-pointer"
													onClick={() => openEditModal(admin)}
												>
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
		</>
	);
}