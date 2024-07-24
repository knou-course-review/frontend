import LoginForm from "@/components/login/LogInForm";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col gap-4 text-center">
      <h1 className="font-bold text-2xl mb-8">로그인</h1>
      <LoginForm />
      <Link href="/signup">회원이 아니신가요? 회원가입 하러 가기 →</Link>
    </div>
  );
}
