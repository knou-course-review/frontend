"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import { changeAccountPassword } from "@/actions/account";
import { FormHelperText } from "@mui/material";

export default function PasswordChangeForm() {
  const [snackbar, setSnackbar] = useState({ isOpen: false, msg: "" });
  const [error, setError] = useState<{ [key: string]: string[] }>({});
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const passwordData = {
      nowPassword: formData.get("nowPassword") as string,
      password: formData.get("password") as string,
      rePassword: formData.get("rePassword") as string,
    };
    const res = await changeAccountPassword(passwordData);
    if (res.isValid) {
      openSnackbar("비밀번호를 변경했습니다.");
    }
    if (res.errors) {
      setError(res.errors);
    }
  };
  const closeSnackbar = () => setSnackbar({ isOpen: false, msg: "" });
  const openSnackbar = (msg: string) => setSnackbar({ isOpen: true, msg });
  return (
    <>
      <form
        className="grid grid-cols-1 min-[375px]:grid-cols-[auto,1fr] sm:max-w-[400px] gap-2 items-center"
        onSubmit={handleSubmit}
      >
        <p className="w-16 mt-0 min-[375px]:mt-2 self-start">비밀번호</p>
        <div className="flex flex-col gap-2">
          <div className="w-full">
            <TextField name="nowPassword" type="password" placeholder="기존 비밀번호" size="small" fullWidth />
            {error.nowPassword && <FormHelperText error>{error.nowPassword[0]}</FormHelperText>}
          </div>
          <div className="w-full">
            <TextField name="password" type="password" placeholder="새 비밀번호" size="small" fullWidth />
            {error.password && <FormHelperText error>{error.password[0]}</FormHelperText>}
          </div>
          <div className="w-full">
            <TextField name="rePassword" type="password" placeholder="새 비밀번호 확인" size="small" fullWidth />
            {error.rePassword && <FormHelperText error>{error.rePassword[0]}</FormHelperText>}
            {error.wrongPassword && <FormHelperText error>{error.wrongPassword[0]}</FormHelperText>}
          </div>
          <div className="self-end">
            <Button type="submit" variant="contained" disableElevation>
              비밀번호 변경
            </Button>
          </div>
        </div>
      </form>
      <Snackbar
        message={snackbar.msg}
        autoHideDuration={2000}
        open={snackbar.isOpen}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}
