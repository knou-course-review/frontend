import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col sm:flex-row h-40 sm:h-56 p-8 justify-end items-end gap-2 sm:gap-6 text-sm sm:text-base bg-[#1c3d8d] dark:bg-[#1e2e55] text-white dark:text-slate-200">
      <Link href="/terms" className="orange-link">
        이용약관
      </Link>
      <Link href="/privacy" className="orange-link">
        개인정보처리방침
      </Link>
      <span>문의: 000@gmail.com</span>
    </div>
  );
}
