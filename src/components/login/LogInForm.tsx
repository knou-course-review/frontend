"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cancel from "@mui/icons-material/Cancel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, FormHelperText, IconButton, TextField } from "@mui/material";
import useAuthContext from "@/hooks/useAuthContext";
import useForm from "@/hooks/useForm";
import { login } from "@/actions/login";

export default function LoginForm() {
  const { formData, updateFormData } = useForm(["username", "password"]);
  const [showPassword, setShowPassword] = useState(false);
  const [isCredentialError, setIsCredentialError] = useState(false);
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const { updateSession } = useAuthContext();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const name = e.target.name;
    updateFormData(name, input);
  };

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const clearInput = (key: string) => updateFormData(key, "");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    const loginCredentials = {
      username: formData.username.value as string,
      password: formData.password.value as string,
    };
    const res = await login(loginCredentials);
    if (res?.isValid) {
      updateSession({ isLoggedIn: true });
      return router.push("/");
    } else if (res?.errors) {
      updateFormData("username", formData.username.value, true, res?.errors.username && res?.errors.username[0]);
      updateFormData("password", formData.password.value, true, res?.errors.password && res?.errors.password[0]);
      setPending(false);
      return;
    }
    setIsCredentialError(true);
    setPending(false);
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col w-56 sm:w-80 gap-4">
      <div>
        <TextField
          name="username"
          size="small"
          placeholder="아이디"
          value={formData.username.value}
          onChange={handleInput}
          fullWidth
          InputProps={{
            endAdornment:
              formData.username.value !== "" ? (
                <IconButton size="small" onClick={() => clearInput("username")}>
                  <Cancel fontSize="small" />
                </IconButton>
              ) : null,
          }}
        />
        {formData.username.error && <FormHelperText error>{formData.username.errorMsg}</FormHelperText>}
      </div>
      <div>
        <TextField
          name="password"
          size="small"
          placeholder="비밀번호"
          value={formData.password.value}
          type={showPassword ? "text" : "password"}
          onChange={handleInput}
          fullWidth
          InputProps={{
            endAdornment: (
              <>
                <IconButton size="small" onClick={handlePasswordVisibility}>
                  {showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                </IconButton>
                {formData.password.value !== "" ? (
                  <IconButton size="small" onClick={() => clearInput("password")}>
                    <Cancel fontSize="small" />
                  </IconButton>
                ) : null}
              </>
            ),
          }}
        />
        {formData.password.error && <FormHelperText error>{formData.password.errorMsg}</FormHelperText>}
      </div>
      {isCredentialError && <FormHelperText error>* 잘못된 아이디 또는 비밀번호입니다.</FormHelperText>}
      <Button type="submit" variant="contained" size="large" className="mt-6" disabled={pending} disableElevation>
        로그인
      </Button>
    </form>
  );
}
