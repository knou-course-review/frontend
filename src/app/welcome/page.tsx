import { Button } from "@mui/material";
import Link from "next/link";

export default function Welcome() {
  return (
    <div className="flex flex-col justify-between text-center h-100">
      <h1 className="text-2xl font-bold">환영합니다!</h1>
      <span className="text-6xl">🎉</span>
      회원 가입이 완료되었습니다!
      <br />
      로그인 후 KNOU 서비스를 이용할 수 있습니다.
      <Button variant="contained">
        <Link href="/login">로그인하러 가기</Link>
      </Button>
    </div>
  );
}
