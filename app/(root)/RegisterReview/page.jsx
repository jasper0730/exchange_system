"use client";
import { useEffect, useState } from "react";
import { Loader, PageLayout, PageTitle } from "@/components/ui";
import { FiSearch, FiExternalLink } from "react-icons/fi";
import { formatDate } from "@/utils/format";
import Link from "next/link";

export default function RegisterReview() {
	const [isLoading, setIsLoading] = useState(true);
	const [searchValue, setSearchValue] = useState("");
	const [users, setUsers] = useState([]);

	const fetchData = async () => {
		try {
			const response = await fetch("/api/review");
			const result = await response.json();
			if (!response.ok) {
				throw new Error(result.message || "API錯誤");
			}

			if (result.ResultCode === 0) {
				setUsers(result.data);
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

	const filteredUsers = users.filter(user=> {
		const keyword = searchValue.toLowerCase()
		const matchKeyword = user.account.toLowerCase().includes(keyword)
		return matchKeyword
	})
	if (isLoading) return <Loader fullScreen />;
	return (
		<PageLayout>
			<PageTitle title="註冊案件審核" />
			<div className="mt-10">
				<div className="flex items-center border border-gray-300 rounded px-3 py-2 w-100 bg-white">
					<FiSearch className="text-gray-500 text-lg" />
					<input
						type="text"
						placeholder="請輸入關鍵字"
						className="ml-2 outline-none flex-1 text-gray-700"
						value={searchValue || ""}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
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
												<FiExternalLink size={18} />
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