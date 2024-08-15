"use client";

import { logout } from "@/actions/logout";

export default function LogoutButton() {
  const handleLogout = async () => {
    await logout();
  };
  return (
    <li className="orange-link cursor-pointer" onClick={handleLogout}>
      로그아웃
    </li>
  );
}
