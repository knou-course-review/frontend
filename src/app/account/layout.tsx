import MyAccountMenu from "@/components/account/MyAccountMenu";

export default function MyAccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <MyAccountMenu />
      {children}
    </div>
  );
}
