"use server";

import { saveSession, verifyAuth } from "@/lib/auth";
import { ErrorSchema } from "@/schema/error";
import { LoginFormSchema } from "@/schema/login";
import { api } from "@/utils/api";

const ERROR_MSG = {
  credentials: "* 잘못된 아이디 또는 비밀번호입니다.",
  token: "* 사용자 정보를 검증할 수 없습니다. 관리자에 문의해 주세요.",
};

export async function login(
  credentials: { username: string; password: string },
  sessionCheck: null | FormDataEntryValue
) {
  const validatedForm = LoginFormSchema.safeParse(credentials);
  if (validatedForm.success) {
    try {
      const res = await api.post("/api/v1/users/sign-in", credentials);
      if (res.ok) {
        const bearerToken = res.headers.get("Authorization");
        if (!bearerToken)
          return {
            isValid: false,
            errors: { credentials: [ERROR_MSG.token] },
          };
        const accessToken = bearerToken.split("Bearer ")[1];
        const payload = await verifyAuth(accessToken);
        if (sessionCheck === null) saveSession(accessToken);
        else saveSession(accessToken, payload.exp * 1000);
        return { isValid: true };
      }
      return { isValid: false, errors: { credentials: [ERROR_MSG.credentials] } };
    } catch (e) {
      const isError = ErrorSchema.safeParse(e);
      if (isError.success) {
        console.log((e as Error).message);
      } else console.log(e);
      return { isValid: false, unknownError: true };
    }
  }
  return { isValid: false, errors: validatedForm.error?.flatten().fieldErrors };
}
