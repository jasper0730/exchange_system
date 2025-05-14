"use client";
import { useState } from "react";
import { PageLayout, PageTitle } from "@/components/ui";
import { Button } from "@/components/common";
import { FiUploadCloud, FiDownload } from "react-icons/fi";
import Swal from "sweetalert2";

export default function UploadInfo() {
	const [file, setFile] = useState(null);
	const [progress, setProgress] = useState(0);

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		if (selectedFile) {
			setFile(selectedFile);
			simulateUpload();
		}
	};
	// 進度條
	const simulateUpload = () => {
		setProgress(0);
		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					return 100;
				}
				return prev + 10;
			});
		}, 200);
	};

	const handleSubmit = () => {
		// 打API
		Swal.fire({
			icon: "success",
			title: "上傳成功",
			text: `已上傳檔案：${file?.name}`,
		});
		setFile(null);
		setProgress(0);
	};

	return (
		<PageLayout>
			<PageTitle title="仲介公司文件上傳與審核" />
			<div
				className="mt-10 border-2 border-dashed border-gray-300 p-10 rounded-lg text-center bg-gray-50"
				onDragOver={(e) => e.preventDefault()}
				onDrop={(e) => {
					e.preventDefault();
					const droppedFile = e.dataTransfer.files[0];
					if (droppedFile) {
						setFile(droppedFile);
						simulateUpload();
					}
				}}
			>
				<FiUploadCloud className="mx-auto text-gray-500 text-5xl mb-4" />
				<p className="text-gray-700 mb-4">將檔案拖放至此或點擊選擇檔案</p>
				<input
					type="file"
					onChange={handleFileChange}
					className="hidden"
					id="fileUpload"
				/>
				<label
					htmlFor="fileUpload"
					className="cursor-pointer px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition"
				>
					選擇檔案
				</label>
				{file && <p className="mt-4 text-gray-700">已選擇檔案：{file.name}</p>}
			</div>
			{file && (
				<div className="mt-6">
					<div className="w-full bg-gray-200 h-4 rounded">
						<div
							className="h-4 bg-green-500 rounded transition-all duration-300"
							style={{ width: `${progress}%` }}
						></div>
					</div>
					<p className="text-gray-700 mt-2 text-right">{progress}%</p>
				</div>
			)}
			<div className="flex justify-between items-center mt-10">
				<a
					href=""
					download
					className="text-gray-900 hover:text-gray-700 flex items-center"
				>
					<FiDownload className="mr-2 text-xl" />
					<span>
						下載標準資料上傳模版
					</span>
				</a>
				<Button
					onClick={handleSubmit}
					disabled={!file || progress < 100}
				>
					確認上傳
				</Button>
			</div>
		</PageLayout>
	);
}
