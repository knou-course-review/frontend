"use client";

import useForm from "@/hooks/useForm";
import { Button, FormHelperText, IconButton, TextField } from "@mui/material";
import Cancel from "@mui/icons-material/Cancel";
import { ChangeEvent, FormEvent, useState } from "react";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Link from "next/link";

export default function LoginForm() {
  const { formData, updateFormData } = useForm(["id", "password"]);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ state: false, message: "" });

  const handleIdInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    updateFormData("id", input);
  };

  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    updateFormData("password", input);
  };

  const validateInput = () => {
    if (formData.id.value === "") return setError({ state: true, message: "* 아이디를 입력해주세요." });
    if (formData.password.value === "") return setError({ state: true, message: "* 비밀번호를 입력해주세요." });
    if (error.state) setError({ state: false, message: "" });
  };

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const clearInput = (key: string) => updateFormData(key, "");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    validateInput();
    if (error.state) return;
    // request api for login
  };

  return (
    <div className="flex w-100">
      <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
        <div>
          <TextField
            label="아이디"
            value={formData.id.value}
            onChange={handleIdInput}
            fullWidth
            InputProps={{
              endAdornment:
                formData.id.value !== "" ? (
                  <IconButton onClick={() => clearInput("id")}>
                    <Cancel />
                  </IconButton>
                ) : null,
            }}
          />
        </div>
        <div>
          <TextField
            label="비밀번호"
            value={formData.password.value}
            type={showPassword ? "text" : "password"}
            onChange={handlePasswordInput}
            fullWidth
            InputProps={{
              endAdornment: (
                <>
                  <IconButton onClick={handlePasswordVisibility}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                  {formData.password.value !== "" ? (
                    <IconButton onClick={() => clearInput("password")}>
                      <Cancel />
                    </IconButton>
                  ) : null}
                </>
              ),
            }}
          />
        </div>
        <div className="text-right">
          <Link href="">아이디 찾기</Link> | <Link href="">비밀번호 찾기</Link>
        </div>
        {error.state && <FormHelperText error>{error.message}</FormHelperText>}
        <Button type="submit" variant="contained" size="large" className="mt-6" disableElevation>
          로그인
        </Button>
      </form>
    </div>
  );
}
