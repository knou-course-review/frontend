"use client";

import Link from "next/link";
import ArrowBack from "@mui/icons-material/ArrowBack";

type NavBackButtonProps = {
  className?: string;
  url: string;
};

export default function NavBackButton({ className, url }: NavBackButtonProps) {
  return (
    <div className={`grid h-[49px] w-full items-center ${className ?? ""}`}>
      <Link
        href={url}
        className="grid w-16 p-1 rounded-lg place-content-center border border-[#aab9e3] dark:border-slate-600 bg-[#f2f4fa] dark:bg-[#1d2945]"
      >
        <ArrowBack />
      </Link>
    </div>
  );
}
