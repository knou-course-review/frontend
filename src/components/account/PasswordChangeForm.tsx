"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function PasswordChangeForm() {
  const [error, setError] = useState<null | string>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <form
      className="grid grid-cols-1 min-[375px]:grid-cols-[auto,1fr] sm:max-w-[400px] gap-2 items-center"
      onSubmit={handleSubmit}
    >
      <p className="w-16 mt-0 min-[375px]:mt-2 self-start">비밀번호</p>
      <div className="flex flex-col gap-2">
        <TextField name="password" type="password" placeholder="기존 비밀번호" size="small" />
        <TextField name="newPassword" type="password" placeholder="새 비밀번호" size="small" />
        <TextField name="newPasswordConfirm" type="password" placeholder="새 비밀번호 확인" size="small" />
        <div className="self-end">
          <Button type="submit" variant="contained" disableElevation>
            비밀번호 변경
          </Button>
        </div>
      </div>
      {error && <p className="px-4 self-end text-rose-600">{error}</p>}
    </form>
  );
}
