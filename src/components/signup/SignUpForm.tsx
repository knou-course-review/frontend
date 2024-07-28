"use client";

import useForm from "@/hooks/useForm";
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
import { ChangeEvent, FocusEventHandler, FormEvent, useState } from "react";
import { NUMBER_REGEX } from "@/utils/regex";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

export default function SignUpForm() {
  const { formData, updateFormData } = useForm(["id", "email", "password", "passwordConfirm", "confirmationCode"]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] = useState(false);
  const [isChecked, setIsChecked] = useState({ tos: false, pp: false });
  const [isFormError, setIsFormError] = useState(false);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const name = e.target.name;

    if (name === "id" && input.length > 20) return;
    if ((name === "confirmationCode" && !NUMBER_REGEX.test(input)) || input.length > 6) return;

    updateFormData(name, input);
  };

  const validatePassword: FocusEventHandler<HTMLInputElement> = (e) => {
    const input = e.target.value;
    if (input.length > 0 && input.length < 8) {
      updateFormData("password", input, true, "* 비밀번호는 8자리 이상이어야 합니다.");
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

  const validateUsername = () => {
    if (formData.id.value === "") updateFormData("id", "", true, "* 아이디를 입력해주세요.");
    console.log("Requesting to server");
  };

  const validateEmail = () => {
    if (formData.email.value === "") updateFormData("email", "", true, "* 이메일을 입력해주세요.");
    console.log("Requesting to server");
  };

  const validateConfirmationCode = () => {
    if (formData.confirmationCode.value === "")
      updateFormData("confirmationCode", "", true, "* 인증번호를 입력해주세요.");
    console.log("Requesting to server");
  };

  const validateFields = () => {
    let isValid = true;
    if (formData.id.value === "") {
      updateFormData("id", "", true, "* 아이디를 입력해주세요.");
      isValid = false;
    }
    if (formData.email.value === "") {
      updateFormData("email", "", true, "* 이메일이 인증되지 않았습니다.");
      isValid = false;
    }
    if (formData.password.value === "") {
      updateFormData("password", "", true, "* 비밀번호를 입력해주세요.");
      isValid = false;
    }
    if (formData.passwordConfirm.value === "") {
      updateFormData("passwordConfirm", "", true, "* 비밀번호를 확인해주세요.");
      isValid = false;
    }
    return isValid;
  };

  const validateAgreements = () => {
    const isValid = isChecked.tos && isChecked.pp;
    setIsFormError(!isValid);
    return isValid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const isValidForm = validateFields();
    const isValidAgreements = validateAgreements();
    if (!isValidForm || !isValidAgreements) return;
    alert("submitted");
  };

  return (
    <div className="flex w-100">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
        <div>
          <FormControl variant="outlined" fullWidth>
            <InputLabel error={formData.id.error}>아이디</InputLabel>
            <OutlinedInput
              name="id"
              label="아이디"
              value={formData.id.value}
              error={formData.id.error}
              onChange={handleInput}
              endAdornment={
                <InputAdornment position="end">
                  <Button variant="contained" size="small" onClick={validateUsername} disableElevation>
                    중복확인
                  </Button>
                </InputAdornment>
              }
            />
            {formData.id.error && <FormHelperText error>{formData.id.errorMsg}</FormHelperText>}
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
              endAdornment={
                <InputAdornment position="end">
                  <Button variant="contained" size="small" onClick={validateEmail} disableElevation>
                    이메일 인증
                  </Button>
                </InputAdornment>
              }
            />
            {formData.email.error && <FormHelperText error>{formData.email.errorMsg}</FormHelperText>}
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
                  03:15
                  <Button variant="contained" size="small" onClick={validateConfirmationCode} disableElevation>
                    인증하기
                  </Button>
                </InputAdornment>
              }
            />
          </FormControl>
          {formData.confirmationCode.error && (
            <FormHelperText error>{formData.confirmationCode.errorMsg}</FormHelperText>
          )}
        </div>
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
        <div>
          <FormControlLabel
            label="모두 동의합니다."
            control={
              <Checkbox checked={isChecked.tos && isChecked.pp} onChange={(e) => handleCheckbox(e, "tos", "pp")} />
            }
          />
          <FormControlLabel
            label="서비스 이용약관에 동의합니다. (필수)"
            control={<Checkbox checked={isChecked.tos} onChange={(e) => handleCheckbox(e, "tos")} />}
          />
          <FormControlLabel
            label="개인정보 처리방침에 동의합니다. (필수)"
            control={<Checkbox checked={isChecked.pp} onChange={(e) => handleCheckbox(e, "pp")} />}
          />
          {isFormError && <FormHelperText error>* 필수 약관에 동의해주세요.</FormHelperText>}
        </div>
        <Button type="submit" variant="contained" size="large" disableElevation>
          가입하기
        </Button>
      </form>
    </div>
  );
}
