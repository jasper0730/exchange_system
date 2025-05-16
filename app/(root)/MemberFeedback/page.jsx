"use client";
import { useState } from "react";
import { PageLayout, PageTitle } from "@/components/ui";
import { Button, Dropdown, IconButton, SearchBar } from "@/components/common";
import FeedbackModal from "@/components/pages/MemberFeedback/FeedbackModal";
import CommonTable, { NoTableData, Table, Tbody, TbodyTr, Td, Th, Thead, TheadTr } from "@/components/ui/CommonTable";

const feedbackTypes = ["問題回報", "建議"];


const dummyFeedbacks = [
	{ id: 1, member: "王小明 (user123)", type: "問題回報", content: "App 當機了", time: "2025/04/01" },
	{ id: 2, member: "陳美麗 (user456)", type: "建議", content: "希望新增夜間模式", time: "2025/04/02" },
];

export default function MemberFeedback() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [feedbackType, setFeedbackType] = useState("");
	const [searchValue, setSearchValue] = useState("");
	const [selectedFeedback, setSelectedFeedback] = useState(null);
	const [feedbacks, setFeedbacks] = useState(dummyFeedbacks);
	const [filteredFeedbacks, setFilteredFeedbacks] = useState(dummyFeedbacks);
	// 權限
	const { routes } = useAuthStore();
	const segments = pathname.split("/").filter(Boolean);
	const pageKey = segments[0];
	const current = routes?.[pageKey];
	const readMode = current === "readonly";
	// 送出
	const handleSubmit = (payload) => {
		console.log('送出', payload);

		closeModal(null);
	};
	// 清空
	const handleClear = () => {
		setSearchValue("");
		setFeedbackType("");
	};
	// 搜尋
	const handleSearch = () => {
		const result = feedbacks.filter(feedback =>
			(
				feedbackType === "" ||
				feedback.type === feedbackType
			) && (
				searchValue === "" ||
				feedback.member.toLowerCase().includes(searchValue.toLowerCase())
			)
		);

		setFilteredFeedbacks(result);
	};
	// 打開Modal
	const openModal = (feedback) => {
		setIsModalOpen(true);
		setSelectedFeedback(feedback);
	};
	// 關閉Modal
	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<PageLayout>
			<PageTitle title="會員反饋" />
			<div className="mt-5 space-y-5">
				<div className="flex justify-end gap-2">
					<Button style="clear" onClick={handleClear}>清空</Button>
					<Button onClick={handleSearch}>搜尋</Button>
				</div>
				<div className="flex flex-wrap gap-4 items-end">
					<div className="flex flex-col gap-2 flex-1">
						<p className="text-gray-900">關鍵字搜尋</p>
						<SearchBar
							value={searchValue || ""}
							onChange={(e) => setSearchValue(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-2 flex-1">
						<p className="text-gray-900">反饋類型</p>
						<Dropdown value={feedbackType} onChange={setFeedbackType} options={feedbackTypes} />
					</div>
				</div>
				<CommonTable className="mt-5">
					<Table>
						<Thead>
							<TheadTr>
								<Th>編號</Th>
								<Th>會員名稱</Th>
								<Th>反饋類型</Th>
								<Th>提交時間</Th>
								<Th>操作</Th>
							</TheadTr>
						</Thead>
						<Tbody>
							{filteredFeedbacks.length > 0 ? filteredFeedbacks.map((feedback, index) => (
								<TbodyTr key={feedback.id}>
									<Td>{index + 1}</Td>
									<Td>{feedback.member}</Td>
									<Td>{feedback.type}</Td>
									<Td>{feedback.time}</Td>
									<Td>
										<IconButton
											type="button"
											onClick={() => openModal(feedback)}
											title="檢視詳細內容"
											style="view"
											disabled={readMode}
										/>
									</Td>
								</TbodyTr>
							))
								: (
									<NoTableData colSpan={5} />
								)
							}
						</Tbody>
					</Table>
				</CommonTable>
			</div>
			<FeedbackModal isOpen={isModalOpen} data={selectedFeedback} onClose={closeModal} onSubmit={handleSubmit} />
		</PageLayout>
	);
}