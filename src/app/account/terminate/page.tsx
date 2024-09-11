import Divider from "@mui/material/Divider";
import NavBackButton from "@/components/nav/NavBackButton";
import TerminationForm from "@/components/account/TerminationForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원 탈퇴 - 노우강",
};

export default function TerminateAccount() {
  return (
    <div className="flex flex-col">
      <NavBackButton className="lg:hidden border-b border-[#aab9e3] dark:border-slate-600" url="/account" />
      <div className="min-h-[500px] w-[90dvw] lg:w-[800px] lg:p-8 my-10 lg:my-0 lg:rounded-2xl lg:border lg:border-[#aab9e3] lg:dark:border-slate-600 lg:dark:bg-[#1d2945]">
        <h1 className="text-2xl font-bold">회원 탈퇴</h1>
        <Divider sx={{ padding: "0.5rem" }} />
        <div className="flex flex-col mt-6 gap-6">
          <p>
            <strong>노우강</strong> 서비스에서 탈퇴합니다.
          </p>
          <p>탈퇴한 계정의 계정 정보는 복구 불가하며, 계정과 관련된 다음 정보는 탈퇴 시 삭제 처리됩니다.</p>
          <li className="ml-4">내가 쓴 리뷰</li>
          <TerminationForm />
        </div>
      </div>
    </div>
  );
}
