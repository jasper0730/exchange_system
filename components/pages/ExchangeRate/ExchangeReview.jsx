import { useState } from "react";
import { CommonTable } from "@/components/ui";
import { NoTableData, Table, Tbody, TbodyTr, Td, Th, Thead, TheadTr } from "@/components/ui/CommonTable";
import ReviewModal from "@/components/pages/ExchangeRate/ReviewModal";
import { FaEye } from "react-icons/fa";

const mockData = [
  {
    id: "1",
    currencyPair: "TWD/USD",
    beforeRate: 31.75,
    afterRate: 31.85,
    applicant: "admin01",
    appliedAt: "2025/05/20 14:30",
  },
  {
    id: "2",
    currencyPair: "USD/VND",
    beforeRate: 24500,
    afterRate: 24600,
    applicant: "admin02",
    appliedAt: "2025/05/21 10:00",
  },
];
export default function ExchangeReview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

  const handleSubmit = (payload) => {
    console.log("送出", payload);
    closeModal();
  };

  const openModal = (item) => {
    setIsModalOpen(true);
    setSelectedCase(item);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCase(null);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">匯率審核</h2>
      <CommonTable>
        <Table>
          <Thead>
            <TheadTr>
              <Th>貨幣對</Th>
              <Th>申請人</Th>
              <Th>申請時間</Th>
              <Th>操作</Th>
            </TheadTr>
          </Thead>
          <Tbody>
            {mockData.length > 0 ? mockData.map((item) => (
              <TbodyTr key={item.id}>
                <Td>{item.currencyPair}</Td>
                <Td>{item.applicant}</Td>
                <Td>{item.appliedAt}</Td>
                <Td>
                  <button
                    onClick={() => openModal(item)}
                    className="text-gray-500 hover:text-gray-900 p-1 rounded transition-colors cursor-pointer"
                  >
                    <FaEye size={18} />
                  </button>
                </Td>
              </TbodyTr>
            ))
              : <NoTableData colSpan={4} />
            }
          </Tbody>
        </Table>
      </CommonTable>
      <ReviewModal
        isOpen={isModalOpen}
        data={selectedCase}
        onClose={closeModal}
        onSubmit={handleSubmit} />
    </div>
  );
}