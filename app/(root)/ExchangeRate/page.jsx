"use client";
import { useState } from "react";
import { PageLayout, PageTitle } from "@/components/ui";
import { ExchangeReview, ExchangeSettings, ExchangeUpdate, } from "@/components/pages/ExchangeRate";
import { TabBar, TabButton } from "@/components/common/TabBar";

const tabs = [
  { key: "update", label: "匯率更新" },
  { key: "review", label: "匯率審核" },
  { key: "settings", label: "參數設定" },
];

export default function ExchangeRate() {
  const [activeTab, setActiveTab] = useState("update");

  return (
    <PageLayout>
      <PageTitle title="匯率更新與調整" />
      <TabBar>
        {tabs.map((tab) => (
          <TabButton
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            isActive={activeTab === tab.key}
          >
            {tab.label}
          </TabButton>
        ))}
        <TabButton>

        </TabButton>
      </TabBar>
      {/* <div className="flex gap-4 border-b mt-10">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 font-semibold cursor-pointer ${activeTab === tab.key
              ? "border-b-2 border-gray-900 text-gray-900"
              : "text-gray-500"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div> */}
      <div className="mt-6">
        {activeTab === "update" && <ExchangeUpdate />}
        {activeTab === "review" && <ExchangeReview />}
        {activeTab === "settings" && <ExchangeSettings />}
      </div>
    </PageLayout>
  );
}