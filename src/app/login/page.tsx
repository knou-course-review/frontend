import Link from "next/link";
import LoginForm from "@/components/login/LogInForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인 - 노우강",
};

export default function Login() {
  return (
    <div className="flex flex-col p-10 sm:p-24 gap-4">
      <h1 className="mb-8 text-center text-2xl font-bold">로그인</h1>
      <LoginForm />
      <div className="text-sm sm:text-base text-right">
        <Link href="/find-username" className="orange-link">
          아이디 찾기
        </Link>{" "}
        |{" "}
        <Link href="/find-password" className="orange-link">
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
}
