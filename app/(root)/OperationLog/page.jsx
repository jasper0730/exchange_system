"use client";
import { useState, useEffect } from "react";
import { PageLayout, PageTitle, Loader } from "@/components/ui";
import { FiSearch, FiFileText, FiDownload } from "react-icons/fi";
import Swal from "sweetalert2";
import { Button, SearchBar } from "@/components/common";
import CommonTable, { Table, Tbody, TbodyTr, Td, Th, Thead, TheadTr } from "@/components/ui/CommonTable";

export default function OperationLog() {
	const [logs, setLogs] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchValue, setSearchValue] = useState("");

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const response = await fetch("/api/operation-log");
			const result = await response.json();
			if (!response.ok || result.ResultCode !== 0) {
				throw new Error(result.message || "API 錯誤");
			}
			setLogs(result.data);
		} catch (error) {
			console.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleExport = () => {
		Swal.fire({
			icon: "success",
			title: "匯出成功",
			text: "已下載操作日誌報表。",
		});
		// 實際匯出邏輯在此打 API 下載檔案
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

	const filteredLogs = logs.filter((log) =>
		log.user.toLowerCase().includes(searchValue.toLowerCase())
	);

	useEffect(() => {
		fetchData();
	}, []);

	if (isLoading) return <Loader fullScreen />;

	return (
		<PageLayout>
			<PageTitle title="操作日誌" />
			<div className="mt-10 flex items-center gap-4">
				<SearchBar value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="請輸入操作人員帳號"/>
				<Button
					type="button"
					className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
					onClick={handleExport}
				>
					<FiDownload />
					匯出日誌
				</Button>
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
							<TbodyTr>
								<Td colSpan="4" className="text-center py-4 text-gray-500">
									沒有符合的資料
								</Td>
							</TbodyTr>
						)}
					</Tbody>
				</Table>
			</CommonTable>
		</PageLayout>
	);
}

