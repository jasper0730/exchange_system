"use client";
import { useEffect, useState } from "react";
import { Loader, PageLayout, PageTitle } from "@/components/ui";
import { Button, Dropdown, IconButton, Pagination, SearchBar, Calender } from "@/components/common";
import CommonTable, { NoTableData, Table, Tbody, TbodyTr, Td, Th, Thead, TheadTr } from "@/components/ui/CommonTable";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store";
import { ReviewModal } from "@/components/pages/ExchangeRate";
import { FaArrowLeft } from "react-icons/fa";

// 狀態轉換
const statusText = (status) => {
	let str;
	switch (status) {
		case "Cancel":
			str = "取消";
			break;
		case "Rejected":
			str = "駁回";
			break;
		case "UnderReview":
			str = "審核中";
			break;
		case "Approved":
			str = "批准";
			break;
		case "Submmit":
			str = "送出";
			break;
		default:
			break;
	}
	return str;
};
// 狀態下拉選單資料
const statusOptions = ["取消", "送出", "審核中", "駁回", "批准",];

export default function ExchangeReview() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [searchValue, setSearchValue] = useState("");
	const [userStatus, setUserStatus] = useState("");
	const [datas, setDatas] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [viewData, setViewData] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [fromDate, setFromDate] = useState("");
	const [toDate, setToDate] = useState("");
	const [pageSize, setPageSize] = useState(10);
	// 權限
	const pathname = usePathname();
	const { routes } = useAuthStore();
	const segments = pathname.split("/").filter(Boolean);
	const pageKey = segments[0];
	const current = routes?.[pageKey];
	const readMode = current === "readonly";
	// 取得會員資料
	const fetchData = async (page = 1, isSearch = false) => {
		try {
			setIsLoading(true);

			const params = new URLSearchParams({
				pageIndex: page.toString(),
				pageSize: pageSize.toString(),
			});

			if (isSearch) {
				if (searchValue) params.append("keyword", searchValue);
				if (userStatus) params.append("status", userStatus);
				if (fromDate) params.append("from", fromDate);
				if (toDate) params.append("to", toDate);
			}

			const response = await fetch(`/api/rate/review?${params.toString()}`);
			const result = await response.json();
			if (!response.ok) {
				throw new Error(result.message || "HTTP 錯誤");
			}
			if (result.ResultCode === 0) {
				console.log(result);
				setDatas(result.ExcangeRateList);
				setTotalPages(result.TotalPage);
				setCurrentPage(page);
			} else {
				throw new Error(result.message || "資料取得失敗");
			}
		} catch (error) {
			console.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};
	const handleOpenModal = (item) => {
		setIsModalOpen(true);
		setViewData(item);
	};
	// 關閉Modal關閉Modal
	const handleCloseModal = () => {
		setIsModalOpen(false);
		setViewData(null);
	};
	// 換頁
	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setCurrentPage(newPage);
		}
	};
	const handlePageSizeChange = (newSize) => {
		setPageSize(newSize);
		setCurrentPage(1);
	};
	// 搜尋
	const handleSearch = () => {
		setCurrentPage(1);
		fetchData(1, true);
	};
	// 清空
	const handleClear = () => {
		setSearchValue("");
		setUserStatus("");
		setFromDate("");
		setToDate("");
		setCurrentPage(1);
	};

	useEffect(() => {
		fetchData(currentPage);
	}, [pageSize, currentPage]);

	if (isLoading) return <Loader fullScreen />;
	return (
		<>
			<PageLayout>
				<PageTitle title="審核列表" />
				<button type="button" className="mt-2 flex gap-1 items-center cursor-pointer" onClick={() => router.back()}><FaArrowLeft size="12" />返回</button>
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
								options={statusOptions}
							/>
						</div>
						<div className="flex flex-col gap-2 flex-1">
							<p className="text-gray-900">日期區間</p>
							<div className="flex items-center gap-2">
								<Calender
									className="flex-1"
									value={fromDate}
									onChange={(e) => setFromDate(e.target.value)}
								/>
								<span>～</span>
								<Calender
									className="flex-1"
									value={toDate}
									onChange={(e) => setToDate(e.target.value)}
								/>
							</div>
						</div>
					</div>
					<div className="mt-5">
						<CommonTable>
							<Table>
								<Thead>
									<TheadTr>
										<Th className="w-[10%]">編號</Th>
										<Th className="w-[35%]">申請人</Th>
										<Th className="w-[15%]">審核狀態</Th>
										<Th className="w-[30%]">申請時間</Th>
										<Th className="w-[10%]">操作</Th>
									</TheadTr>
								</Thead>
								<Tbody>
									{isLoading && <Loader page />}
									{datas.length > 0 ? datas.map((item, index) => {
										let status;
										if (item.Status === "Cancel") {
											status = "取消";
										} else if (item.Status === "Rejected") {
											status = "駁回";
										} else if (item.Status === "UnderReview") {
											status = "審核中";
										} else if (item.Status === "Approved") {
											status = "批准";
										} else if (item.Status === "Submmit") {
											status = "已送出";
										}
										return (
											<TbodyTr key={item.ExchangeRateApplyId}>
												<Td>{index + 1}</Td>
												<Td>{item.ApplyUser}</Td>
												<Td>
													{statusText(item.Status)}
												</Td>
												<Td>
													{item.ApplyTime}
												</Td>
												<Td>
													<IconButton
														type="button"
														title="檢視會員資料"
														style="view"
														onClick={() => handleOpenModal(item)}
														disabled={readMode}
													/>
												</Td>
											</TbodyTr>
										);
									})
										: <NoTableData colSpan={6} />
									}
								</Tbody>
							</Table>
						</CommonTable>
						<div className="mt-2">
							<div className="w-20">
								<Dropdown
									placeholder={null}
									value={pageSize}
									onChange={handlePageSizeChange}
									options={[10, 20, 30]}
								/>
							</div>
						</div>
						<div className="mt-2">
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePageChange}
							/>
						</div>
					</div>
				</div>
			</PageLayout>
			<ReviewModal isOpen={isModalOpen} data={viewData} onClose={handleCloseModal} />
		</>
	);
}