import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { getSession } from "@/lib/auth";

export default async function NavBar() {
  const userSession = await getSession();
  return (
    <div className="flex border-b border-b-slate-400 dark:border-b-slate-500 justify-items-center h-24 items-center p-8">
      <div>
        <Link href="/">KNOU</Link>
      </div>
      <div className="flex gap-7 ml-auto list-none">
        {userSession.isLoggedIn ? (
          <>
            <li>마이페이지</li>
            <LogoutButton />
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
