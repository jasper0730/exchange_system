"use client";
import { useState } from "react";
import { Loader, PageLayout, PageTitle } from "@/components/ui";

export default function AppManagement() {
    const [isLoading, setIsLoading] = useState(false);

    if (isLoading) return <Loader fullScreen />;
    return (
        <>
            <PageLayout>
                <PageTitle title="App 會員管理" />
            </PageLayout>
        </>
    );
}