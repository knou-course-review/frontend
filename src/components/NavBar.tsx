import Link from "next/link";

export default function NavBar() {
  return (
    <div className="flex border-b border-b-slate-400 bg-white justify-items-center h-28 items-center p-8">
      <div>로고</div>
      <div className="flex gap-7 ml-auto list-none">
        <li>
          <Link href="/login">로그인</Link>
        </li>
        <li>
          <Link href="/signup">회원가입</Link>
        </li>
      </div>
    </div>
  );
}
