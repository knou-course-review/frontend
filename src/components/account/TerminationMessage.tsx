import Link from "next/link";
import Button from "@mui/material/Button";

export default function TerminationMessage() {
  return (
    <div className="flex flex-col h-72 sm:h-100 sm:my-12 justify-between text-center">
      <h1 className="text-2xl font-bold">또 만나요!</h1>
      <span className="text-6xl">👋</span>
      회원 탈퇴가 완료되었습니다.
      <br />
      KNOU를 이용해 주셔서 감사합니다.
      <Button variant="contained" className="w-40 self-center" disableElevation>
        <Link href="/">메인화면으로</Link>
      </Button>
    </div>
  );
}
