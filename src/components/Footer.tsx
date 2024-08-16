import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex h-32 sm:h-56 p-8 justify-end items-end gap-6 bg-[#1c3d8d] dark:bg-[#1e2e55] text-white dark:text-slate-200">
      <Link href="/terms" className="orange-link text-sm sm:text-base">
        이용약관
      </Link>
      <Link href="/privacy" className="orange-link text-sm sm:text-base">
        개인정보처리방침
      </Link>
      <span className="text-sm sm:text-base">문의: 000@gmail.com</span>
    </div>
  );
}
