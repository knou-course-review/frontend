"use client";

import { useRouter } from "next/navigation";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

export default function NavTabs({ currentValue }: { currentValue: string }) {
  const router = useRouter();
  return (
    <div className="lg:hidden w-full border-b border-[#aab9e3] dark:border-slate-600">
      <Tabs value={currentValue}>
        <Tab value="my-account" label="내 정보 수정" onClick={() => router.push("/account")} />
        <Tab value="my-reviews" label="내가 쓴 리뷰" onClick={() => router.push("/account/reviews")} />
      </Tabs>
    </div>
  );
}
