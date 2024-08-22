"use client";

import Link from "next/link";
import ArrowBack from "@mui/icons-material/ArrowBack";

export default function NavBackTab() {
  return (
    <div className="lg:hidden grid h-[49px] w-full items-center border-b border-[#aab9e3] dark:border-slate-600">
      <Link
        href="/account"
        className="grid w-16 p-1 rounded-lg place-content-center border border-[#aab9e3] dark:border-slate-600 bg-[#f2f4fa] dark:bg-[#1d2945]"
      >
        <ArrowBack />
      </Link>
    </div>
  );
}
