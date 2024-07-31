"use client";

import { type ChangeEvent, type FocusEventHandler, type FormEvent, useCallback, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Timer from "./Timer";
import useForm from "@/hooks/useForm";
import { checkCode, checkEmail, checkUsername, sendCode, signup } from "@/actions/signup";
import { NUMBER_REGEX } from "@/utils/regex";

type FormErrorMessages = {
  [key: string]: string[];
};

export default function SignUpForm() {
  const { formData, updateFormData } = useForm([
    "username",
    "email",
    "password",
    "passwordConfirm",
    "confirmationCode",
  ]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] = useState(false);
  const [isChecked, setIsChecked] = useState({ tos: false, pp: false });
  const [formError, setFormError] = useState<FormErrorMessages>({});
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidCode, setIsValidCode] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [pendingEmail, setPendingEmail] = useState(false);
  const [pendingCode, setPendingCode] = useState(false);
  const router = useRouter();

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const name = e.target.name;

    if (name === "username" && isValidUsername) {
      setIsValidUsername(false);
    }
    if (
      (name === "confirmationCode" && !NUMBER_REGEX.test(input)) ||
      (name === "confirmationCode" && input.length > 6)
    ) {
      return;
    }
    updateFormData(name, input);
  };

  const validatePassword: FocusEventHandler<HTMLInputElement> = (e) => {
    const input = e.target.value;
    if (input.length > 0 && input.length < 8) {
      updateFormData("password", input, true, "* 비밀번호는 8자리 이상이어야 합니다.");
    } else {
      setFormError((prev) => ({ ...prev, password: [] }));
    }
    if (formData.passwordConfirm.value && formData.password.value !== formData.passwordConfirm.value) {
      updateFormData("passwordConfirm", formData.passwordConfirm.value, true, "* 비밀번호가 일치하지 않습니다.");
    }
  };

  const validatePasswordConfirm: FocusEventHandler<HTMLInputElement> = (e) => {
    const input = e.target.value;
    const error = input !== formData.password.value;
    const errorMsg = input !== formData.password.value ? "* 비밀번호가 일치하지 않습니다." : "";
    updateFormData("passwordConfirm", input, error, errorMsg);
    if (!error) {
      setFormError((prev) => ({ ...prev, passwordConfirm: [] }));
    }
  };

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>, ...keys: string[]) => {
    setIsChecked((prev) => {
      const checkedStatus = { ...prev };
      keys.forEach((key) => (checkedStatus[key as keyof typeof prev] = e.target.checked));
      return checkedStatus;
    });
  };

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const handleConfirmationPasswordVisibility = () => setShowConfirmationPassword(!showConfirmationPassword);

  const validateUsername = async () => {
    if (formData.username.value === "") return updateFormData("username", "", true, "* 아이디를 입력해주세요.");
    const result = await checkUsername(formData.username.value as string);
    if (result?.isValid) {
      setIsValidUsername(true);
      setFormError((prev) => ({ ...prev, username: [] }));
    }
  };

  const validateEmail = async () => {
    if (formData.email.value === "") return updateFormData("email", "", true, "* 이메일을 입력해주세요.");
    if (!(formData.email.value as string).endsWith("@knou.ac.kr"))
      return updateFormData("email", formData.email.value, true, "* @knou.ac.kr 도메인의 이메일을 입력해 주세요.");
    if (!isValidCode) {
      setPendingEmail(true);
      const result = await checkEmail(formData.email.value as string);
      if (result?.isValid) {
        setIsValidEmail(true);
        const result = await sendCode(formData.email.value as string);
        if (result?.isValid) {
          setPendingEmail(false);
          setIsTimerActive(true);
          setIsTimerRunning(true);
          setFormError((prev) => ({ ...prev, email: [] }));
        }
      }
    }
  };

  const validateConfirmationCode = async () => {
    if (formData.confirmationCode.value === "") {
      return updateFormData("confirmationCode", "", true, "* 인증번호를 입력해주세요.");
    }
    const confirmationBody = {
      email: formData.email.value as string,
      code: formData.confirmationCode.value as string,
    };
    setPendingCode(true);
    const result = await checkCode(confirmationBody);
    if (result.isValid) {
      setIsValidCode(true);
      setIsValidEmail(true);
      setIsTimerRunning(false);
      updateFormData("confirmationCode", formData.confirmationCode.value);
    }
    if (!result.isValid) {
      updateFormData("confirmationCode", formData.confirmationCode.value, true, "* 잘못된 인증번호입니다.");
    }
    setPendingCode(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const signupData = {
      username: {
        name: formData.username.value as string,
        isValid: isValidUsername,
      },
      email: {
        email: formData.email.value as string,
        isValid: isValidEmail,
      },
      confirmationCode: {
        code: formData.confirmationCode.value as string,
        isValid: isValidCode,
      },
      password: formData.password.value as string,
      passwordConfirm: formData.passwordConfirm.value as string,
      agreements: {
        tos: isChecked.tos,
        pp: isChecked.pp,
      },
    };
    const res = await signup(signupData);
    if (res.isValid) {
      router.push("/welcome");
      return;
    }
    if (res.errors) {
      setFormError(res.errors);
      console.log(res.errors);
    }
  };

  const endTimer = useCallback(() => {
    setIsTimerRunning(false);
  }, []);

  return (
    <div className="flex w-100">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
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
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={validateUsername}
                    disabled={isValidUsername}
                    disableElevation
                  >
                    중복확인
                  </Button>
                </InputAdornment>
              }
            />
            {isValidUsername && <FormHelperText>* 사용 가능한 아이디입니다.</FormHelperText>}
            {formData.username.error ? (
              <FormHelperText error>{formData.username.errorMsg}</FormHelperText>
            ) : formError.username ? (
              <FormHelperText error>{formError.username[0]}</FormHelperText>
            ) : null}
          </FormControl>
        </div>
        <div>
          <FormControl variant="outlined" disabled={isValidCode} fullWidth>
            <InputLabel error={formData.email.error}>이메일</InputLabel>
            <OutlinedInput
              name="email"
              label="이메일"
              value={formData.email.value}
              error={formData.email.error}
              onChange={handleInput}
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={validateEmail}
                    disabled={isValidCode || isTimerRunning || pendingEmail}
                    disableElevation
                  >
                    {pendingEmail ? "확인중..." : "이메일 인증"}
                  </Button>
                </InputAdornment>
              }
            />
            {formData.email.error ? (
              <FormHelperText error>{formData.email.errorMsg}</FormHelperText>
            ) : formError.email ? (
              <FormHelperText error>{formError.email[0]}</FormHelperText>
            ) : null}
          </FormControl>
        </div>
        {isTimerActive && (
          <div>
            <FormControl variant="outlined" disabled={isValidCode} fullWidth>
              <InputLabel error={formData.confirmationCode.error}>인증번호</InputLabel>
              <OutlinedInput
                name="confirmationCode"
                label="인증번호"
                value={formData.confirmationCode.value}
                error={formData.confirmationCode.error}
                onChange={handleInput}
                endAdornment={
                  <InputAdornment position="end" className="flex gap-3">
                    {isTimerRunning && <Timer endTimer={endTimer} />}
                    <Button
                      variant="contained"
                      size="small"
                      onClick={validateConfirmationCode}
                      disabled={isValidCode || pendingCode}
                      disableElevation
                    >
                      {pendingCode ? "확인중..." : "인증하기"}
                    </Button>
                  </InputAdornment>
                }
              />
            </FormControl>
            {isValidCode && <FormHelperText>* 이메일이 인증되었습니다.</FormHelperText>}
            {formData.confirmationCode.error ? (
              <FormHelperText error>{formData.confirmationCode.errorMsg}</FormHelperText>
            ) : formError.confirmationCode ? (
              <FormHelperText error>{formError.confirmationCode[0]}</FormHelperText>
            ) : null}
          </div>
        )}
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
            {formData.password.error ? (
              <FormHelperText error>{formData.password.errorMsg}</FormHelperText>
            ) : formError.password ? (
              <FormHelperText error>{formError.password[0]}</FormHelperText>
            ) : null}
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
            {formData.passwordConfirm.error ? (
              <FormHelperText error>{formData.passwordConfirm.errorMsg}</FormHelperText>
            ) : formError.passwordConfirm ? (
              <FormHelperText error>{formError.passwordConfirm[0]}</FormHelperText>
            ) : null}
          </FormControl>
        </div>
        <div>
          <FormControlLabel
            label="모두 동의합니다."
            control={
              <Checkbox checked={isChecked.tos && isChecked.pp} onChange={(e) => handleCheckbox(e, "tos", "pp")} />
            }
          />
          <FormControlLabel
            label="서비스 이용약관에 동의합니다. (필수)"
            control={<Checkbox name="tos" checked={isChecked.tos} onChange={(e) => handleCheckbox(e, "tos")} />}
          />
          <FormControlLabel
            label="개인정보 처리방침에 동의합니다. (필수)"
            control={<Checkbox name="pp" checked={isChecked.pp} onChange={(e) => handleCheckbox(e, "pp")} />}
          />
          {formError.agreements && <FormHelperText error>{formError.agreements[0]}</FormHelperText>}
        </div>
        <Button type="submit" variant="contained" size="large" disableElevation>
          가입하기
        </Button>
      </form>
    </div>
  );
}
