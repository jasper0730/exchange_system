"use client";
import { useEffect, useState } from "react";
import { Loader, PageLayout, PageTitle } from "@/components/ui";
import { formatDate } from "@/utils/format";
import Link from "next/link";
import { Button, IconButton, SearchBar } from "@/components/common";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store";

export default function RegisterReview() {
	const [isLoading, setIsLoading] = useState(true);
	const [searchValue, setSearchValue] = useState("");
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	// 權限
	const pathname = usePathname();
	const { routes } = useAuthStore();
	const segments = pathname.split("/").filter(Boolean);
	const pageKey = segments[0];
	const current = routes?.[pageKey];
	const readMode = current === "readonly";
	// 取得案件審核資料
	const fetchData = async () => {
		try {
			const response = await fetch("/api/review");
			const result = await response.json();
			if (!response.ok) {
				throw new Error(result.message || "Http 錯誤");
			}

			if (result.ResultCode === 0) {
				setUsers(result.data);
				setFilteredUsers(result.data);
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
			return matchKeyword;
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
		<PageLayout>
			<PageTitle title="註冊案件審核" />
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
				<div className="mt-5">
					<div className="overflow-x-auto w-full">
						<table className="min-w-full bg-white border border-gray-200 text-left">
							<thead>
								<tr className="bg-gray-900 text-white">
									<th className="px-4 py-2 w-[10%]">編號</th>
									<th className="px-4 py-2 w-[55%]">帳號</th>
									<th className="px-4 py-2 w-[20%]">提交時間</th>
									<th className="px-4 py-2 w-[15%]">操作</th>
								</tr>
							</thead>
							<tbody>
								{filteredUsers && filteredUsers.map((user, index) => (
									<tr key={user.id}>
										<td className="px-4 py-2">{index + 1}</td>
										<td className="px-4 py-2">{user.account}</td>
										<td className="px-4 py-2">{formatDate(user.sentTime)}</td>
										<td className="px-4 py-2">
											<Link href={`/RegisterReview/${user.id}`}>
												<IconButton
													type="button"
													style="view"
													title="檢視案件"
													disabled={readMode}
												/>
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</PageLayout>
	);
}