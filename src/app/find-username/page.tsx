import FindUserForm from "@/components/find-username/FindUserForm";
import LostCredentialsNav from "@/components/LostCredentialsNav";

export default function FindUsername() {
  return (
    <div className="flex flex-col gap-8">
      <LostCredentialsNav currentPath="/find-username" />
      <FindUserForm />
    </div>
  );
}
