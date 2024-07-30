"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import Link from "next/link";
import Cancel from "@mui/icons-material/Cancel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, FormHelperText, IconButton, TextField } from "@mui/material";
import useForm from "@/hooks/useForm";

export default function LoginForm() {
  const { formData, updateFormData } = useForm(["username", "password"]);
  const [showPassword, setShowPassword] = useState(false);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const name = e.target.name;
    updateFormData(name, input);
  };

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const clearInput = (key: string) => updateFormData(key, "");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // request api for login
  };

  return (
    <div className="flex w-100">
      <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
        <div>
          <TextField
            name="username"
            label="아이디"
            value={formData.username.value}
            onChange={handleInput}
            fullWidth
            InputProps={{
              endAdornment:
                formData.username.value !== "" ? (
                  <IconButton onClick={() => clearInput("username")}>
                    <Cancel />
                  </IconButton>
                ) : null,
            }}
          />
        </div>
        <div>
          <TextField
            name="password"
            label="비밀번호"
            value={formData.password.value}
            type={showPassword ? "text" : "password"}
            onChange={handleInput}
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
        <Button type="submit" variant="contained" size="large" className="mt-6" disableElevation>
          로그인
        </Button>
      </form>
    </div>
  );
}
