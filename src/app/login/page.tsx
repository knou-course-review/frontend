import Link from "next/link";
import LoginForm from "@/components/login/LogInForm";

export default function Login() {
  return (
    <div className="flex flex-col p-10 sm:p-24 gap-4">
      <h1 className="mb-8 text-center text-2xl font-bold">로그인</h1>
      <LoginForm />
      <div className="text-sm sm:text-base text-right">
        <Link href="/find-username">아이디 찾기</Link> | <Link href="/find-password">비밀번호 찾기</Link>
      </div>
    </div>
  );
}
