import Link from "next/link";

export default function MyAccountMenu() {
  return (
    <div className="hidden lg:flex flex-col w-40 h-fit pt-8 pb-36 gap-4 rounded-2xl text-center ml-auto list-none border border-[#aab9e3] dark:border-slate-600 dark:bg-[#1d2945]">
      <li>
        <Link href="/account">내 정보 수정</Link>
      </li>
      <li>
        <Link href="/account/reviews">내가 쓴 리뷰</Link>
      </li>
    </div>
  );
}
