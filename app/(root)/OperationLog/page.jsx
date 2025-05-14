"use client";
import { useState, useEffect } from "react";
import { PageLayout, PageTitle, Loader } from "@/components/ui";
import { FiSearch, FiFileText, FiDownload } from "react-icons/fi";
import Swal from "sweetalert2";
import { Button, SearchBar } from "@/components/common";
import CommonTable, { NoTableData, Table, Tbody, TbodyTr, Td, Th, Thead, TheadTr } from "@/components/ui/CommonTable";

export default function OperationLog() {
	const [logs, setLogs] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [filteredLogs, setFilteredLogs] = useState([]);

	// 取得操作紀錄資料
	const fetchData = async () => {
		try {
			setIsLoading(true);
			const response = await fetch("/api/log");
			const result = await response.json();
			if (!response.ok) {
				throw new Error(result.message || "API 錯誤");
			}

			if (result.ResultCode !== 0) {
				setLogs(result.data);
				setFilteredLogs(result.data);
			} else {
				throw new Error(result.message || "資料取得失敗");
			}
		} catch (error) {
			console.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleClear = () => {
		setSearchValue("");
	};
	const handleSearch = () => {
		const keyword = searchValue.toLowerCase()
		const result = logs.filter((log) =>
			log.user.toLowerCase().includes(keyword)
		);
		setFilteredLogs(result);
	};



	const handleExport = () => {
		Swal.fire({
			icon: "success",
			title: "匯出成功",
			text: "已下載操作日誌報表。",
		});
		// 打API
	};

	const handleViewDetail = (log) => {
		Swal.fire({
			title: "詳細日誌內容",
			html: `
        <p><strong>操作人員：</strong>${log.user}</p>
        <p><strong>操作時間：</strong>${log.time}</p>
        <p><strong>操作類型：</strong>${log.action}</p>
        <p><strong>詳細內容：</strong>${log.details}</p>
      `,
			confirmButtonText: "關閉",
		});
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (isLoading) return <Loader fullScreen />;

	return (
		<PageLayout>
			<PageTitle title="操作日誌" />
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
						className="flex items-center gap-2 "
						onClick={handleExport}
					>
						<FiDownload />
						<span className="whitespace-nowrap">匯出日誌</span>
					</Button>
				</div>
			</div>
			<CommonTable className="mt-5">
				<Table>
					<Thead>
						<TheadTr>
							<Th>操作人員</Th>
							<Th>操作時間</Th>
							<Th>操作內容</Th>
							<Th>操作</Th>
						</TheadTr>
					</Thead>
					<Tbody>
						{filteredLogs.length > 0 ? (
							filteredLogs.map((log) => (
								<TbodyTr key={log.id}>
									<Td>{log.user}</Td>
									<Td>{log.time}</Td>
									<Td>{log.action}</Td>
									<Td>
										<button
											type="button"
											className="text-gray-500 hover:text-gray-900 p-1 rounded transition-colors"
											onClick={() => handleViewDetail(log)}
										>
											<FiFileText size={18} />
										</button>
									</Td>
								</TbodyTr>
							))
						) : (
							<NoTableData colSpan={4} />
						)}
					</Tbody>
				</Table>
			</CommonTable>
		</PageLayout>
	);
}

