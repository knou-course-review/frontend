"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import Cancel from "@mui/icons-material/Cancel";
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
import { checkCode, getUsername, sendCode } from "@/actions/lost-credentials";
import { NUMBER_REGEX } from "@/utils/regex";

export default function FindUserForm() {
  const { formData, updateFormData } = useForm(["email", "confirmationCode"]);
  const [isExpiredCode, setIsExpiredCode] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [pendingCode, setPendingCode] = useState(false);
  const [pending, setPending] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

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
    if (!formData.email.value)
      return updateFormData("email", formData.email.value, true, "* @knou.ac.kr 도메인의 이메일을 입력해 주세요.");
    setPendingCode(true);
    const result = await sendCode(formData.email.value as string);
    if (result.isValid) {
      setIsTimerRunning(true);
      updateFormData("confirmationCode", formData.confirmationCode.value, false);
    }
    if (!result.isValid) {
      updateFormData(
        "confirmationCode",
        formData.confirmationCode.value,
        true,
        "* 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
      );
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.confirmationCode.value === "")
      return updateFormData("confirmationCode", formData.confirmationCode.value, true, "* 인증번호를 입력해 주세요.");

    setPending(true);
    const isValid = await validateConfirmationCode();
    if (!isValid) return;
    const res = await getUsername(formData.email.value as string);
    setPending(false);
    if (!res.isValid)
      return updateFormData("confirmationCode", formData.confirmationCode.value, true, "* 아이디를 찾을 수 없습니다.");
    setAccount(res.data.username);
  };

  if (account)
    return (
      <div className="flex flex-col pt-8 gap-8 w-full">
        <p>
          회원님의 아이디는 <strong>{account}</strong> 입니다.
        </p>
        <Link href="/login">
          <Button variant="contained" disableElevation>
            로그인
          </Button>
        </Link>
      </div>
    );
  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
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
        <Button
          type="submit"
          variant="contained"
          size="large"
          className="mt-6"
          disabled={!isTimerRunning || pending}
          disableElevation
        >
          {pending ? "..." : "아이디 찾기"}
        </Button>
      </form>
    </div>
  );
}
