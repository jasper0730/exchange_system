"use client";
import { useEffect, useState } from "react";
import { Loader, PageLayout, PageTitle } from "@/components/ui";
import { Button, Dropdown, IconButton, SearchBar } from "@/components/common";
import CommonTable, { NoTableData, Table, Tbody, TbodyTr, Td, Th, Thead, TheadTr } from "@/components/ui/CommonTable";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store";
import { ReviewModal } from "@/components/pages/ExchangeRate";

export default function ExchangeReview() {
	const [isLoading, setIsLoading] = useState(true);
	const [searchValue, setSearchValue] = useState("");
	const [userStatus, setUserStatus] = useState("已註記");
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [viewData, setViewData] = useState(null);
	// 權限
	const pathname = usePathname();
	const { routes } = useAuthStore();
	const segments = pathname.split("/").filter(Boolean);
	const pageKey = segments[0];
	const current = routes?.[pageKey];
	const readMode = current === "readonly";
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
	const handleOpenModal = (user) => {
		setIsModalOpen(true);
		setViewData(user);
	};
	// 關閉Modal關閉Modal
	const handleCloseModal = (user) => {
		setIsModalOpen(false);
		setViewData(null);
	};
	// 搜尋
	const handleSearch = () => {
		const keyword = searchValue.toLowerCase();
		const results = users.filter(user => {
			const matchKeyword = user.account.toLowerCase().includes(keyword);
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
				<PageTitle title="審核列表" />
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
							<p className="text-gray-900">
								審核狀態
							</p>
							<Dropdown
								value={userStatus}
								onChange={setUserStatus}
								options={[
									"已審核",
									"待審核",
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
										<Th className="w-[40%]">帳號</Th>
										<Th className="w-[15%]">是否註記</Th>
										<Th className="w-[15%]">操作</Th>
									</TheadTr>
								</Thead>
								<Tbody>
									{filteredUsers.length > 0 ? filteredUsers.map((user, index) => (
										<TbodyTr key={user.userId}>
											<Td>{index + 1}</Td>
											<Td>{user.account}</Td>
											<Td>
												待審核
											</Td>
											<Td>
												<IconButton
													type="button"
													title="檢視會員資料"
													style="view"
													onClick={() => handleOpenModal(user)}
													disabled={readMode}
												/>
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
			<ReviewModal isOpen={isModalOpen} data={viewData} onClose={handleCloseModal}/>
		</>
	);
}