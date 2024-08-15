"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import Cancel from "@mui/icons-material/Cancel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import ConfirmationTimer from "../ConfirmationTimer";
import useForm from "@/hooks/useForm";
import { changePassword, checkCode, getPasswordAccess, sendCode } from "@/actions/lost-credentials";
import { NUMBER_REGEX } from "@/utils/regex";

export default function FindPasswordForm() {
  const { formData, updateFormData } = useForm([
    "username",
    "email",
    "confirmationCode",
    "password",
    "passwordConfirm",
  ]);
  const [isExpiredCode, setIsExpiredCode] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [pendingCode, setPendingCode] = useState(false);
  const [pending, setPending] = useState(false);
  const [isValidAccount, setIsValidAccount] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] = useState(false);
  const [changedPassword, setChangedPassword] = useState(false);
  const [formError, setFormError] = useState({ isError: false, errorMsg: "" });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const name = e.target.name;
    if (name === "confirmationCode") {
      if (!NUMBER_REGEX.test(input) || input.length > 6) return;
    }
    updateFormData(name, input);
  };

  const validateEmail = () => {
    if (!formData.email.value || !(formData.email.value as string).endsWith("@knou.ac.kr")) {
      updateFormData("email", formData.email.value, true, "* @knou.ac.kr 도메인의 이메일을 입력해 주세요.");
    } else {
      updateFormData("email", formData.email.value, false, "");
    }
  };

  const sendConfirmationCode = async () => {
    if (!formData.username.value)
      updateFormData("username", formData.username.value, true, "* 아이디를 입력해 주세요.");
    if (!formData.email.value)
      return updateFormData("email", formData.email.value, true, "* @knou.ac.kr 도메인의 이메일을 입력해 주세요.");
    setPendingCode(true);
    const result = await sendCode(formData.email.value as string);
    if (result.isValid) {
      setIsTimerRunning(true);
      updateFormData("confirmationCode", formData.confirmationCode.value, false);
    }
    if (!result.isValid) {
      setFormError({ isError: true, errorMsg: "* 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." });
    }
    setPendingCode(false);
  };

  const validateConfirmationCode = async () => {
    const confirmationBody = {
      email: formData.email.value as string,
      code: formData.confirmationCode.value as string,
    };
    const result = await checkCode(confirmationBody);
    if (result.isValid) return true;
    updateFormData("confirmationCode", formData.confirmationCode.value, true, "* 잘못된 인증번호입니다.");
    return false;
  };

  const endTimer = useCallback(() => {
    setIsTimerRunning(false);
    setIsExpiredCode(true);
    updateFormData(
      "confirmationCode",
      formData.confirmationCode.value,
      true,
      "* 인증번호가 만료되었습니다. 이메일 인증을 다시 진행해 주세요."
    );
  }, []);

  const clearInput = (key: string) => updateFormData(key, "");

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const handleConfirmationPasswordVisibility = () => setShowConfirmationPassword(!showConfirmationPassword);

  const validatePassword: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const input = e.target.value;
    if (input.length > 0 && input.length < 8) {
      updateFormData("password", input, true, "* 비밀번호는 8자리 이상이어야 합니다.");
    }
    if (formData.passwordConfirm.value && formData.password.value !== formData.passwordConfirm.value) {
      updateFormData("passwordConfirm", formData.passwordConfirm.value, true, "* 비밀번호가 일치하지 않습니다.");
    }
  };

  const validatePasswordConfirm: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const input = e.target.value;
    const error = input !== formData.password.value;
    const errorMsg = input !== formData.password.value ? "* 비밀번호가 일치하지 않습니다." : "";
    updateFormData("passwordConfirm", input, error, errorMsg);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.confirmationCode.value === "")
      return updateFormData("confirmationCode", formData.confirmationCode.value, true, "* 인증번호를 입력해 주세요.");

    setPending(true);
    const isValid = await validateConfirmationCode();
    if (!isValid) return;
    const form = { username: formData.username.value as string, email: formData.email.value as string };
    const res = await getPasswordAccess(form);
    setPending(false);
    if (!res.isValid) return setFormError({ isError: true, errorMsg: "* 잘못된 정보입니다." });

    setIsValidAccount(true);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password.value === "")
      updateFormData("password", formData.password.value, true, "* 비밀번호를 입력해 주세요.");
    if (formData.email.value === "")
      setFormError({ isError: true, errorMsg: "* 오류가 발생했습니다. 페이지를 새로고침해 주세요." });
    if (formData.passwordConfirm.value === "")
      return updateFormData("passwordConfirm", formData.passwordConfirm.value, true, "* 비밀번호를 확인해 주세요.");

    setPending(true);
    const form = {
      email: formData.email.value as string,
      password: formData.password.value as string,
      rePassword: formData.passwordConfirm.value as string,
    };
    const res = await changePassword(form);
    setPending(false);
    if (!res.isValid)
      return setFormError({ isError: true, errorMsg: "* 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." });

    setChangedPassword(true);
  };

  if (changedPassword)
    return (
      <div className="flex flex-col pt-8 gap-8 w-full">
        <p className="text-center">비밀번호를 변경했습니다.</p>
        <Link href="/login">
          <Button variant="contained" disableElevation>
            로그인
          </Button>
        </Link>
      </div>
    );
  if (isValidAccount)
    return (
      <div>
        <form onSubmit={handlePasswordChange} className="w-full flex flex-col gap-4">
          <p className="text-center">새 비밀번호를 설정해 주세요.</p>
          <div>
            <FormControl variant="outlined" fullWidth>
              <InputLabel error={formData.password.error}>비밀번호</InputLabel>
              <OutlinedInput
                name="password"
                label="비밀번호"
                type={showPassword ? "text" : "password"}
                value={formData.password.value}
                error={formData.password.error}
                onChange={handleInput}
                onBlur={validatePassword}
                endAdornment={
                  <IconButton onClick={handlePasswordVisibility}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                }
              />
              {formData.password.error && <FormHelperText error>{formData.password.errorMsg}</FormHelperText>}
            </FormControl>
          </div>
          <div>
            <FormControl variant="outlined" fullWidth>
              <InputLabel error={formData.passwordConfirm.error}>비밀번호 확인</InputLabel>
              <OutlinedInput
                name="passwordConfirm"
                label="비밀번호 확인"
                type={showConfirmationPassword ? "text" : "password"}
                value={formData.passwordConfirm.value}
                error={formData.passwordConfirm.error}
                onChange={handleInput}
                onBlur={validatePasswordConfirm}
                endAdornment={
                  <IconButton onClick={handleConfirmationPasswordVisibility}>
                    {showConfirmationPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                }
              />
              {formData.passwordConfirm.error && (
                <FormHelperText error>{formData.passwordConfirm.errorMsg}</FormHelperText>
              )}
            </FormControl>
          </div>
          <Button type="submit" variant="contained" size="large" disableElevation>
            비밀번호 재설정
          </Button>
        </form>
      </div>
    );
  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div>
          <FormControl variant="outlined" fullWidth>
            <InputLabel error={formData.username.error}>아이디</InputLabel>
            <OutlinedInput
              name="username"
              label="아이디"
              value={formData.username.value}
              error={formData.username.error}
              onChange={handleInput}
              endAdornment={
                formData.username.value !== "" ? (
                  <IconButton onClick={() => clearInput("username")}>
                    <Cancel />
                  </IconButton>
                ) : (
                  <></>
                )
              }
            />
            {formData.username.error && <FormHelperText error>{formData.username.errorMsg}</FormHelperText>}
          </FormControl>
        </div>
        <div>
          <FormControl variant="outlined" fullWidth>
            <InputLabel error={formData.email.error}>이메일</InputLabel>
            <OutlinedInput
              name="email"
              label="이메일"
              value={formData.email.value}
              error={formData.email.error}
              onChange={handleInput}
              onBlur={validateEmail}
              endAdornment={
                formData.email.value !== "" ? (
                  <IconButton onClick={() => clearInput("email")}>
                    <Cancel />
                  </IconButton>
                ) : (
                  <></>
                )
              }
            />
            <FormHelperText error={formData.email.error}>* @knou.ac.kr 도메인의 이메일을 입력해 주세요.</FormHelperText>
          </FormControl>
        </div>
        <div>
          <FormControl variant="outlined" fullWidth>
            <InputLabel error={formData.confirmationCode.error}>인증번호</InputLabel>
            <OutlinedInput
              name="confirmationCode"
              label="인증번호"
              value={formData.confirmationCode.value}
              error={formData.confirmationCode.error}
              onChange={handleInput}
              endAdornment={
                <InputAdornment position="end" className="flex gap-3">
                  {isTimerRunning && <ConfirmationTimer endTimer={endTimer} />}
                  <Button
                    variant="contained"
                    size="small"
                    onClick={sendConfirmationCode}
                    disabled={isTimerRunning || pendingCode}
                    disableElevation
                  >
                    {pendingCode ? "발송중..." : isExpiredCode ? "재발송" : "인증번호 발송"}
                  </Button>
                </InputAdornment>
              }
            />
            {formData.confirmationCode.error && (
              <FormHelperText error>{formData.confirmationCode.errorMsg}</FormHelperText>
            )}
          </FormControl>
        </div>
        {formError.isError && <FormHelperText error>{formError.errorMsg}</FormHelperText>}
        <Button
          type="submit"
          variant="contained"
          size="large"
          className="mt-6"
          disabled={!isTimerRunning || pending}
          disableElevation
        >
          {pending ? "..." : "계정 인증"}
        </Button>
      </form>
    </div>
  );
}
