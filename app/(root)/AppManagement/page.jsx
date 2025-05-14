"use client";
import { useEffect, useState } from "react";
import { CommonTable, Loader, PageLayout, PageTitle } from "@/components/ui";
import { MdToggleOff, MdToggleOn } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { formatDate } from "@/utils/format";
import { Button, Dropdown, SearchBar } from "@/components/common";
import { NoTableData, Table, Tbody, TbodyTr, Td, Th, Thead, TheadTr } from "@/components/ui/CommonTable";

export default function AppManagement() {
	const [isLoading, setIsLoading] = useState(true);
	const [searchValue, setSearchValue] = useState("");
	const [activeStatus, setActiveStatus] = useState("");
	const [userStatus, setUserStatus] = useState("");
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);

	// 取得會員資料
	const fetchData = async () => {
		try {
			const response = await fetch("/api/user");
			const result = await response.json();
			if (!response.ok) {
				throw new Error(result.message || "API錯誤");
			}

			if (result.ResultCode === 0) {
				setUsers(result.getUser);
				setFilteredUsers(result.getUser);
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
		const results = users.filter(user => {
			const matchKeyword = user.account.toLowerCase().includes(keyword);

			const matchActiveStatus =
				activeStatus === "" ||
				(activeStatus === "啟用" && user.status) ||
				(activeStatus === "停用" && !user.status);

			const matchUserStatus = userStatus === "" || user.remark === userStatus;

			return matchKeyword && matchActiveStatus && matchUserStatus;
		});
		setFilteredUsers(results);
	};
	// 清空
	const handleClear = () => {
		setSearchValue("");
		setActiveStatus("");
		setUserStatus("");
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (isLoading) return <Loader fullScreen />;
	return (
		<>
			<PageLayout>
				<PageTitle title="App 會員管理" />
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
						<div className="flex flex-col gap-2 flex-1">
							<p className="text-gray-900">
								會員狀態
							</p>
							<Dropdown
								value={userStatus}
								onChange={setUserStatus}
								options={[
									"正常",
									"未生效",
									"註冊待審",
									"補件待審",
									"審核中",
									"驗證失敗-待補件",
									"限制使用",
									"黑名單",
									"註銷",
								]}
							/>
						</div>
					</div>
					<div className="mt-5">
						<CommonTable>
							<Table>
								<Thead>
									<TheadTr>
										<Th className="w-[10%]">編號</Th>
										<Th className="w-[30%]">帳號</Th>
										<Th className="w-[20%]">註冊日期</Th>
										<Th className="w-[15%]">狀態</Th>
										<Th className="w-[10%]">啟用</Th>
										<Th className="w-[15%]">操作</Th>
									</TheadTr>
								</Thead>
								<Tbody>
									{filteredUsers.length > 0 ? filteredUsers.map((user, index) => (
										<TbodyTr key={user.userId}>
											<Td>{index + 1}</Td>
											<Td>{user.account}</Td>
											<Td>{formatDate(user.createTime)}</Td>
											<Td>
												{user.remark}
											</Td>
											<Td>
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
											</Td>
											<Td>
												<button
													type="button"
													title="編輯"
													className="text-gray-500 hover:text-gray-900 p-1 rounded transition-colors cursor-pointer"
													onClick={() => openEditModal(admin)}
												>
													<FaEdit size={18} />
												</button>
											</Td>
										</TbodyTr>
									))
										: <NoTableData colSpan={6} />
									}
								</Tbody>
							</Table>
						</CommonTable>
					</div>
				</div>
			</PageLayout>
		</>
	);
}