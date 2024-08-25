"use client";

import Link from "next/link";
import Image from "next/image";
import LogoutButton from "./LogoutButton";
import useAuthContext from "@/hooks/useAuthContext";

export default function NavBar() {
  const { session, isLoading } = useAuthContext();
  if (isLoading)
    return (
      <div className="flex h-16 sm:h-24 px-4 sm:px-8 justify-items-center items-center bg-[#1c3d8d] dark:bg-[#1e2e55] text-white dark:text-slate-200">
        <Link href="/" className="mr-auto">
          <Image src="/logo480x480.svg" width={32} height={32} alt="노우강 로고" />
        </Link>
      </div>
    );
  return (
    <div className="flex h-16 sm:h-24 px-4 sm:px-8 justify-items-center items-center bg-[#1c3d8d] dark:bg-[#1e2e55] text-white dark:text-slate-200">
      <Link href="/">
        <Image src="/logo480x480.svg" width={32} height={32} alt="노우강 로고" />
      </Link>
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
