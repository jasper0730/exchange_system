"use client";
import { useEffect, useState } from "react";
import { Loader, PageLayout, PageTitle } from "@/components/ui";
import { Bar, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import StatCard from "@/components/pages/ExchangeMonitor/StatCard";

export default function ExchangeMonitor() {
	const [isLoading, setIsLoading] = useState(true);
	const [stats, setStats] = useState({});
	const [dateRange, setDateRange] = useState("today");
	const [customRange, setCustomRange] = useState({ from: "", to: "" });

	const fetchData = async () => {
		try {
			const params = new URLSearchParams();
			if (dateRange === "custom") {
				if (customRange.from) params.append("from", customRange.from);
				if (customRange.to) params.append("to", customRange.to);
			} else {
				params.append("range", dateRange);
			}
			const response = await fetch(`/api/exchange?${params.toString()}`);
			const result = await response.json();

			if (!response.ok) {
				throw new Error(response.message || "API錯誤");
			}

			if (result.ResultCode === 0) {
				setStats(result.data);
			} else {
				throw new Error(result.message || "資料取得失敗");
			}
		} catch (error) {
			console.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const currentStat = stats[dateRange];

	const handleCustomDateChange = (field, value) => {
		setCustomRange((prev) => ({ ...prev, [field]: value }));
		setDateRange("custom");
	};

	// 交易狀態統計的圖表設定
	const barData = {
		labels: ["已完成", "待審核", "失敗"],
		datasets: [
			{
				label: "交易筆數",
				data: [
					currentStat?.completed.count,
					currentStat?.pending.count,
					currentStat?.failed.count
				],
				backgroundColor: ["#4ade80", "#fbbf24", "#f87171"],
			},
		],
	};

	// 幣別交易金額占比的圖表設定
	const doughnutData = {
		labels: stats.currencies && Object.keys(stats.currencies),
		datasets: [
			{
				data: stats.currencies && Object.values(stats.currencies),
				backgroundColor: ["#60a5fa", "#fbbf24", "#f87171"],
			},
		],
	};

	useEffect(() => {
		fetchData();
	}, [dateRange, customRange]);

	if (isLoading) return <Loader fullScreen />;
	return (
		<PageLayout>
			<PageTitle title="匯兌交易監控" />
			<div className="flex gap-4 mt-10 mb-5 items-center flex-wrap">
				{["today", "week", "month"].map((range) => (
					<button
						key={range}
						onClick={() => setDateRange(range)}
						className={`px-4 py-2 rounded cursor-pointer ${dateRange === range ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-700"
							}`}
					>
						{range === "today" && "今日"}
						{range === "week" && "本週"}
						{range === "month" && "本月"}
					</button>
				))}
				<div className="flex items-center gap-2">
					<div>
						<label>起：</label>
						<input
							type="date"
							value={customRange.from}
							onChange={(e) => handleCustomDateChange("from", e.target.value)}
							className="border px-2 py-1 rounded text-gray-700"
						/>
					</div>
					<div>
						<label>迄：</label>
						<input
							type="date"
							value={customRange.to}
							onChange={(e) => handleCustomDateChange("to", e.target.value)}
							className="border px-2 py-1 rounded text-gray-700"
						/>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<StatCard title="申請總筆數" value={currentStat.total.count} />
				<StatCard title="申請總金額" value={`$${currentStat.total.amount.toLocaleString()}`} />
				<StatCard title="已完成筆數" value={currentStat.completed.count} />
				<StatCard title="完成總金額" value={`$${currentStat.completed.amount.toLocaleString()}`} />
				<StatCard title="待審核筆數" value={currentStat.pending.count} />
				<StatCard title="待審總金額" value={`$${currentStat.pending.amount.toLocaleString()}`} />
				<StatCard title="失敗筆數" value={currentStat.failed.count} />
				<StatCard title="失敗總金額" value={`$${currentStat.failed.amount.toLocaleString()}`} />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
				<div className="bg-white p-6 rounded shadow border border-gray-200">
					<h2 className="text-xl font-semibold mb-4">交易狀態統計</h2>
					<div className="flex items-center h-full">
						<Bar data={barData} />
					</div>
				</div>
				<div className="bg-white p-6 rounded shadow border border-gray-200">
					<h2 className="text-xl font-semibold mb-4">幣別交易金額占比</h2>
					<Doughnut data={doughnutData} />
				</div>
			</div>
			<div className="bg-white p-6 rounded shadow border border-gray-200 mt-10">
				<h2 className="text-xl font-semibold mb-4">資金水位預警</h2>
				<div className="w-full bg-gray-200 h-4 rounded">
					<div
						className={`h-4 rounded ${stats?.fundLevel >= 90 ? "bg-red-500" : stats?.fundLevel >= 85 ? "bg-yellow-500" : "bg-green-500"
							}`}
						style={{ width: `${stats?.fundLevel}%` }}
					></div>
				</div>
				<p className="text-gray-700 mt-2">目前資金水位：{stats?.fundLevel}%</p>
			</div>
		</PageLayout>
	);
}


