"use client";

import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function NavBar() {
  const { session } = useAuthContext();
  return (
    <div className="flex h-16 sm:h-24 p-4 sm:p-8 justify-items-center items-center bg-[#1c3d8d] dark:bg-[#1e2e55] text-white dark:text-slate-200">
      <div>
        <Link href="/" className="orange-link">
          KNOU
        </Link>
      </div>
      <div className="flex gap-7 ml-auto list-none">
        {session.isLoggedIn ? (
          <>
            <li>
              <Link href="/account" className="orange-link">
                마이페이지
              </Link>
            </li>
            <LogoutButton />
          </>
        ) : (
          <>
            <li>
              <Link href="/login" className="orange-link">
                로그인
              </Link>
            </li>
            <li>
              <Link href="/signup" className="orange-link">
                회원가입
              </Link>
            </li>
          </>
        )}
      </div>
    </div>
  );
}
