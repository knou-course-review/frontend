"use client";

import { logout } from "@/actions/logout";
import useAuthContext from "@/hooks/useAuthContext";

export default function LogoutButton() {
  const { updateSession } = useAuthContext();
  const handleLogout = async () => {
    await logout();
    updateSession({ isLoggedIn: false });
  };
  return (
    <li className="orange-link cursor-pointer" onClick={handleLogout}>
      로그아웃
    </li>
  );
}
