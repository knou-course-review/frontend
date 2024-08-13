import AccountInfoForm from "@/components/account/AccountInfoForm";
import { Divider } from "@mui/material";

export default function MyAccount() {
  return (
    <div className="p-8 rounded-2xl border bg-white border-slate-400 dark:border-slate-500">
      <h1 className="text-2xl font-bold">내 정보 수정</h1>
      <Divider sx={{ padding: "0.5rem" }} />
      <AccountInfoForm />
    </div>
  );
}
