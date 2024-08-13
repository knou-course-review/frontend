import Link from "next/link";

export default function MyAccountMenu() {
  return (
    <div className="flex flex-col gap-4 w-40 h-fit pt-8 pb-36 rounded-2xl text-center ml-auto list-none border bg-white border-slate-400 dark:border-slate-500">
      <li>
        <Link href="/account">내 정보 수정</Link>
      </li>
    </div>
  );
}
