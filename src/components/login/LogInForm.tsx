"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import useAuthContext from "@/hooks/useAuthContext";
import { login } from "@/actions/login";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<{ [key: string]: string[] | undefined }>({});
  const [pending, setPending] = useState(false);
  const { updateSession } = useAuthContext();

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const loginCredentials = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };
    const res = await login(loginCredentials, formData.get("session"));
    if (res.isValid) {
      updateSession({ isLoggedIn: true });
      return router.push("/");
    } else if (res.errors) {
      setError(res.errors);
    }
    setPending(false);
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col w-56 sm:w-80 gap-2">
      <div>
        <TextField name="username" size="small" placeholder="아이디" fullWidth />
        {error.username && <FormHelperText error>{error.username[0]}</FormHelperText>}
      </div>
      <div>
        <TextField
          name="password"
          size="small"
          placeholder="비밀번호"
          type={showPassword ? "text" : "password"}
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton size="small" onClick={handlePasswordVisibility}>
                {showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
              </IconButton>
            ),
          }}
        />
        {error.password && <FormHelperText error>{error.password[0]}</FormHelperText>}
      </div>
      <div>
        <FormControlLabel label="로그인 유지" name="session" control={<Checkbox size="small" />} />
      </div>
      {error.credentials && <FormHelperText error>{error.credentials[0]}</FormHelperText>}
      <div className="mt-6 w-full">
        <Button type="submit" variant="contained" size="large" disabled={pending} fullWidth disableElevation>
          로그인
        </Button>
      </div>
    </form>
  );
}
