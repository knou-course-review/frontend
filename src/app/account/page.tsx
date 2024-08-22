import Link from "next/link";
import Divider from "@mui/material/Divider";
import AccountInfoForm from "@/components/account/AccountInfoForm";
import NavTabs from "@/components/nav/NavTabs";

export default function MyAccount() {
  return (
    <div className="flex flex-col">
      <NavTabs currentValue="my-account" />
      <div className="min-h-[500px] w-[90dvw] lg:w-[800px] lg:p-8 my-10 lg:my-0 lg:rounded-2xl lg:border lg:border-[#aab9e3] lg:dark:border-slate-600 lg:dark:bg-[#1d2945]">
        <h1 className="text-2xl font-bold">내 정보 수정</h1>
        <Divider sx={{ padding: "0.5rem" }} />
        <AccountInfoForm />
        <div className="mt-10 text-right text-rose-600 dark:text-[#ff5d65]">
          <Link href="/account/terminate">회원 탈퇴</Link>
        </div>
      </div>
    </div>
  );
}
