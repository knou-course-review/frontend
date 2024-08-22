import Link from "next/link";
import Button from "@mui/material/Button";

export default function WelcomeMessage() {
  return (
    <div className="flex flex-col h-72 sm:h-100 sm:my-12 justify-between text-center">
      <h1 className="text-2xl font-bold">환영합니다!</h1>
      <span className="text-6xl">🎉</span>
      회원 가입이 완료되었습니다!
      <br />
      로그인 후 KNOU 서비스를 이용할 수 있습니다.
      <Button variant="contained" className="w-40 self-center" disableElevation>
        <Link href="/login">로그인하기</Link>
      </Button>
    </div>
  );
}
