import FindUserForm from "@/components/find-username/FindUserForm";
import LostCredentialsNav from "@/components/LostCredentialsNav";

export default function FindUsername() {
  return (
    <div className="flex flex-col h-[470px] gap-10 items-center">
      <LostCredentialsNav currentPath="/find-username" />
      <FindUserForm />
    </div>
  );
}
