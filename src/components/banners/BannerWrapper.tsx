"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Close from "@mui/icons-material/Close";
import { getCookieValue } from "@/utils/dom";

type BannerProps = {
  targetUrl: string;
  cookieKey: string;
  theme: string;
  children: React.ReactNode;
};

export default function BannerWrapper({ targetUrl, cookieKey, theme, children }: BannerProps) {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (!window.document) return;
    const cookieValue = getCookieValue(cookieKey);
    if (cookieValue !== "N") setIsShowing(true);
  }, []);

  const closeBanner = () => {
    if (window.document) {
      document.cookie = `${cookieKey}=N;max-age=86400;samesite=strict`;
    }
    setIsShowing(false);
  };

  if (!isShowing) return null;
  return (
    <div className="fixed left-0 right-0 bottom-0 z-0 overflow-hidden h-24 sm:h-32">
      <Link href={targetUrl} target="_blank">
        {children}
      </Link>
      <div
        className={`absolute top-2 right-2 sm:top-4 sm:right-4 z-20 flex gap-2 items-center text-xs sm:text-sm ${
          theme === "dark" ? "text-white" : "text-slate-800"
        } cursor-pointer`}
        onClick={closeBanner}
      >
        오늘 하루동안 안보기
        <Close fontSize="small" />
      </div>
    </div>
  );
}
