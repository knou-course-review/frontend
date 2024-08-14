import Divider from "@mui/material/Divider";
import TerminationForm from "@/components/account/TerminationForm";

export default function TerminateAccount() {
  return (
    <div className="lg:min-w-[800px] min-h-[500px] p-8 rounded-2xl border bg-white border-slate-400 dark:border-slate-500">
      <h1 className="text-2xl font-bold">회원 탈퇴</h1>
      <Divider sx={{ padding: "0.5rem" }} />
      <div className="flex flex-col gap-6 mt-6">
        <p>
          <strong>KNOU</strong> 서비스에서 탈퇴합니다.
        </p>
        <p>탈퇴한 계정의 계정 정보는 복구 불가하며, 계정과 관련된 다음 정보는 탈퇴 시 삭제 처리됩니다.</p>
        <li className="ml-4">내가 쓴 리뷰</li>
        <TerminationForm />
      </div>
    </div>
  );
}
