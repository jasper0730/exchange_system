"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader, PageLayout, PageTitle } from "@/components/ui";
import { FiSettings, FiCheckSquare } from "react-icons/fi";
import { Button } from "@/components/common";
import { calculateFinalRate } from "@/utils/format";
import { ExchangeModal } from "@/components/pages/ExchangeRate";

export default function ExchangeRate() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const fetchData = async () => {
    try {
      const response = await fetch("/api/rate");
      if (!response.ok) {
        throw new Error(response.statusText || "HTTP 錯誤");
      }
      const result = await response.json();
      if (result.ResultCode === 0) {
        setData(result);
      } else {
        throw new Error(result.message || "資料取得失敗");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarginChange = (countryId, value) => {
    setData((prev) => ({
      ...prev,
      CountryList: prev.CountryList.map((c) =>
        c.CountryId === countryId ? { ...c, ExchangeRateMargin: parseFloat(value) || 0 } : c
      ),
    }));
  };

  const handleSubmit = () => {
    // TODO: API 更新
    Swal.fire({
      icon: "success",
      title: "更新成功",
      text: "匯率已成功更新！",
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <Loader fullScreen />;
  return (
    <>
      <PageLayout>
        <PageTitle title="匯率更新與調整" />
        <div className="mt-5 flex justify-end gap-2">
          <Button onClick={() => setIsModalOpen(true)}>
            <span className="inline-flex items-center gap-1">
              <FiSettings className="text-lg" />
              參數設定
            </span>
          </Button>
          <Link href="/ExchangeRate/ExchangeReview">
            <Button>
              <span className="inline-flex items-center gap-1">
                <FiCheckSquare className="text-lg" />
                審核列表
              </span>
            </Button>
          </Link>
        </div>
        <div className="mt-5 space-y-5">
          <div className="bg-white p-6 rounded shadow border border-gray-200">
            <h2 className="text-lg font-bold mb-4">台幣(TWD)</h2>
            <p className="text-gray-700">基準對美元匯率：{data?.TwdToUsdRate}</p>
            <div className="text-gray-500 text-sm mt-2 flex justify-end">
              <p>生效時間：{data?.EffectiveTime}</p>
            </div>
          </div>
          {data?.CountryList && data?.CountryList.map((item) => (
            <div key={item.CountryId} className="bg-white p-6 rounded shadow border border-gray-200">
              <h3 className="text-lg font-bold mb-4">
                {item.CountryName} ({item.CurrencyCode})
              </h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  基準對美元匯率：<span className="font-bold">{item.ExchangeRate}</span>
                </p>
                <p className="text-gray-700 mt-2">
                  浮動加成參數 (%)：<span className="font-bold">{item.ExchangeRateMargin}</span>
                </p>
                <p className="text-gray-700 mt-2">
                  最終公告匯率：<span className="font-bold">
                    {calculateFinalRate(item.ExchangeRate, item.ExchangeRateMargin)}
                  </span>
                </p>
                <p className="text-gray-700 mt-2">
                  手續費：<span className="font-bold">{item.Fee ?? "無"}</span>
                </p>
                <div className="text-gray-500 text-sm mt-2 flex justify-end">
                  <p>生效時間：{data?.EffectiveTime}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PageLayout>
      <ExchangeModal
        data={data}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}