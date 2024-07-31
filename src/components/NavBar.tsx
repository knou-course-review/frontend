"use client";

import { logout } from "@/actions/logout";
import useSession from "@/hooks/useSession";
import Link from "next/link";

export default function NavBar() {
  const { session, setSession } = useSession();
  const handleLogout = async () => {
    await logout();
    setSession(null);
  };
  return (
    <div className="flex border-b border-b-slate-400 bg-white justify-items-center h-24 items-center p-8">
      <div>
        <Link href="/">로고</Link>
      </div>
      <div className="flex gap-7 ml-auto list-none">
        {session && session.isLoggedIn ? (
          <>
            <li>마이페이지</li>
            <li className="cursor-pointer" onClick={handleLogout}>
              로그아웃
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">로그인</Link>
            </li>
            <li>
              <Link href="/signup">회원가입</Link>
            </li>
          </>
        )}
      </div>
    </div>
  );
}
