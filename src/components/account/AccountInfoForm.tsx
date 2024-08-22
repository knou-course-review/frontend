"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import PasswordChangeForm from "./PasswordChangeForm";

type AccountInfoFormProps = {
  username: string;
  email: string;
};

export default function AccountInfoForm({ username, email }: AccountInfoFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleClick = () => setIsExpanded(true);
  return (
    <div className="flex flex-col sm:max-w-[400px] my-4">
      <div className="grid grid-cols-1 min-[375px]:grid-cols-[auto,1fr] mb-2 gap-2 items-center">
        <p className="w-16">아이디</p>
        <TextField value={username} size="small" disabled />
        <p>이메일</p>
        <TextField value={email} size="small" disabled />
      </div>
      {isExpanded && <PasswordChangeForm />}
      {!isExpanded && (
        <Button className="self-end" variant="contained" onClick={handleClick} disableElevation>
          비밀번호 변경
        </Button>
      )}
    </div>
  );
}
