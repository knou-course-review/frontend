import FindPasswordForm from "@/components/find-password/FindPasswordForm";
import LostCredentialsNav from "@/components/LostCredentialsNav";

export default function FindPassword() {
  return (
    <div className="flex flex-col h-[470px] my-10 gap-10 items-center">
      <LostCredentialsNav currentPath="/find-password" />
      <FindPasswordForm />
    </div>
  );
}
