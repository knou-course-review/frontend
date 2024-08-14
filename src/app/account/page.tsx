import Link from "next/link";
import Divider from "@mui/material/Divider";
import AccountInfoForm from "@/components/account/AccountInfoForm";

export default function MyAccount() {
  return (
    <div className="min-h-[500px] w-[90dvw] lg:w-[800px] p-8 rounded-2xl border bg-white border-slate-400 dark:border-slate-500">
      <h1 className="text-2xl font-bold">내 정보 수정</h1>
      <Divider sx={{ padding: "0.5rem" }} />
      <AccountInfoForm />
      <div className="text-right text-rose-600">
        <Link href="/account/terminate">회원 탈퇴</Link>
      </div>
    </div>
  );
}
