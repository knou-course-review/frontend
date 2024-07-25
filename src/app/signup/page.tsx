import SignUpForm from "@/components/signup/SignUpForm";

export default function Login() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-2xl mb-8 text-center">회원가입</h1>
      <SignUpForm />
    </div>
  );
}
