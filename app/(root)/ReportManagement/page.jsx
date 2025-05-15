"use client";
import { useState } from "react";
import { PageLayout, PageTitle } from "@/components/ui";
import { Button, Dropdown } from "@/components/common";
import { FiDownload } from "react-icons/fi";
import Calender from "@/components/common";
import CommonTable,{ NoTableData, Table, Tbody, TbodyTr, Td, Th, Thead, TheadTr } from "@/components/ui/CommonTable";

const reportTypes = ["交易報表", "風險報表"];

const dummyReports = [
	{ id: 1, name: "交易報表 - 2025/03/01", date: "2025/03/01", type: "交易報表" },
	{ id: 2, name: "風險報表 - 2025/03/01", date: "2025/03/01", type: "風險報表" },
];

export default function ReportManagement() {
	const [reportType, setReportType] = useState("");
	const [fromDate, setFromDate] = useState("");
	const [toDate, setToDate] = useState("");
	const [reports, setReports] = useState(dummyReports);
	// 搜尋
	const handleSearch = () => {
		const filtered = dummyReports.filter((report) => {
			// 類型
			const matchType =
				reportType === "" || report.type === reportType;

			// 日期
			const reportDate = new Date(report.date.replace(/\//g, "-"));
			const from = fromDate ? new Date(fromDate) : null;
			const to = toDate ? new Date(toDate) : null;

			const matchDate = (!from || reportDate >= from) && (!to || reportDate <= to);

			return matchType && matchDate;
		});

		setReports(filtered);
	};

	// 清空
	const handleClear = () => {
		setReportType("");
		setFromDate("");
		setToDate("");
	};

	const handleExport = async (reportName) => {
		try {
			const response = await fetch("/api/report");
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `${reportName}.csv`;
			a.click();
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error("匯出失敗", error);
		}
	};

	return (
		<PageLayout>
			<PageTitle title="報表管理" />
			<div className="mt-5 space-y-5">
				<div className="flex justify-end gap-2">
					<Button style="clear" onClick={handleClear}>清空</Button>
					<Button onClick={handleSearch}>搜尋</Button>
				</div>
				<div className="flex flex-wrap gap-4 items-end">
					<div className="flex flex-col gap-2 flex-1">
						<p className="text-gray-900">報表類型</p>
						<Dropdown
							value={reportType}
							onChange={setReportType}
							options={reportTypes}
						/>
					</div>
					<div className="flex flex-col gap-2 flex-1">
						<p className="text-gray-900">起始日期</p>
						<Calender
							value={fromDate}
							onChange={(e) => setFromDate(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-2 flex-1">
						<p className="text-gray-900">結束日期</p>
						<Calender
							value={toDate}
							onChange={(e) => setToDate(e.target.value)}
						/>
					</div>
				</div>
				<CommonTable className="mt-5">
					<Table>
						<Thead>
							<TheadTr>
								<Th>編號</Th>
								<Th>報表名稱</Th>
								<Th>日期</Th>
								<Th>類型</Th>
								<Th>下載</Th>
							</TheadTr>
						</Thead>
						<Tbody>
							{reports.length > 0 ? (
								reports.map((report, idx) => (
									<TbodyTr key={report.id}>
										<Td>{idx + 1}</Td>
										<Td>{report.name}</Td>
										<Td>{report.date}</Td>
										<Td>{report.type}</Td>
										<Td>
											<button
												onClick={() => handleExport(report.name)}
												className="text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
												title="下載報表"
											>
												<FiDownload size={20} />
											</button>
										</Td>
									</TbodyTr>
								))
							) : (
								<NoTableData colSpan={5} />
							)}
						</Tbody>
					</Table>
				</CommonTable>
			</div>
		</PageLayout>
	);
}