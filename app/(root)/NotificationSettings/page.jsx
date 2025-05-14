
"use client";
import { useState } from "react";
import { PageLayout, PageTitle } from "@/components/ui";
import { Button, Dropdown, Textarea, Input } from "@/components/common";
import Swal from "sweetalert2";

const variableOptions = ["會員姓名", "交易金額", "交易時間", "帳戶餘額"];

export default function NotificationSettings() {
	const [type, setType] = useState(variableOptions[0]);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	// 參數插入
	const handleVariableInsert = (variable) => {
		setContent((prev) => `${prev}${variable}`);
	};
	// 預覽
	const handlePreview = () => {
		const formattedContent = content
			.replace(/\n/g, "<br/>")
			.replace(/{{(.*?)}}/g, '$1');

		Swal.fire({
			title: title || "預覽標題",
			html: `<div style="text-align: left;">${formattedContent || "預覽內容"}</div>`,
			width: 600,
		});
	};
	// 清空
	const handleClear = () => {
		setType(variableOptions[0])
		setTitle("");
		setContent("");
	};
	// 儲存
	const handleSave = () => {
		Swal.fire({
			icon: "success",
			title: "儲存成功",
		});
		// 打 API
	};

	return (
		<PageLayout>
			<PageTitle title="通知模版設定" />
			<div className="space-y-5 mt-10">
				<div>
					<p className="text-lg font-bold mb-2">通知類型</p>
					<Dropdown
						value={type}
						onChange={setType}
						options={[
							"電子郵件",
							"簡訊",
							"推播"
						]}
					/>
				</div>
				<div>
					<p className="text-lg font-bold mb-2">標題</p>
					<Input
						placeholder="請輸入標題"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="border p-2 w-full rounded text-gray-700 border-gray-300"
					/>
				</div>
				<div>
					<p className="text-lg font-bold mb-2">內容</p>
					<Textarea
						rows="6"
						placeholder="請輸入內容..."
						value={content || ""}
						onChange={(e) => setContent(e.target.value)}
					/>
				</div>
				<div>
					<p className="text-lg font-bold mb-2">變數插入</p>
					<div className="flex flex-wrap gap-2">
						{variableOptions.map((variable) => (
							<button
								key={variable}
								type="button"
								className="border px-3 py-1 rounded text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
								onClick={() => handleVariableInsert(variable)}
							>
								{variable}
							</button>
						))}
					</div>
				</div>
				<div className="flex gap-4 mt-20 justify-center">
					<Button onClick={handlePreview}>預覽</Button>
					<Button onClick={handleSave}>
						儲存
					</Button>
					<Button onClick={handleClear} style="clear">
						清空
					</Button>
				</div>
			</div>
		</PageLayout>
	);
}

