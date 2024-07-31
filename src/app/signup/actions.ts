"use server";

import { ErrorSchema } from "@/schema/error";
import { SignupFormSchema } from "@/schema/signup";
import { api } from "@/utils/api";

let serverCode: number;

export async function checkUsername(username: string) {
  try {
    const res = await api.post("/api/v1/users/duplicate-username", { username });
    console.log(res);
    if (res.ok) {
      return { isValid: true };
    }
  } catch (e) {
    const isError = ErrorSchema.safeParse(e);
    if (isError.success) {
      console.log((e as Error).message);
    } else console.log(e);
    return { isValid: false };
  }
}

export async function checkEmail(email: string) {
  try {
    const res = await api.post("/api/v1/users/duplicate-email", { email });
    console.log(res);
    if (res.ok) {
      return { isValid: true };
    }
  } catch (e) {
    const isError = ErrorSchema.safeParse(e);
    if (isError.success) {
      console.log((e as Error).message);
    } else console.log(e);
    return { isValid: false };
  }
}

export async function sendCode(email: string) {
  try {
    const res = await api.post("/api/v1/mail", { email });
    console.log(res);
    if (res.ok) {
      const body = await res.json();
      console.log(body);
      serverCode = body.data.code;
      return { isValid: true };
    }
  } catch (e) {
    const isError = ErrorSchema.safeParse(e);
    if (isError.success) {
      console.log((e as Error).message);
    } else console.log(e);
    return { isValid: false };
  }
}

export async function checkCode(code: string) {
  const userCode = Number(code);
  const isValid = serverCode === userCode;
  return { isValid };
}

export async function signup(formData: any) {
  const validatedForm = SignupFormSchema.safeParse(formData);
  if (validatedForm.success) {
    try {
      const res = await api.post("/api/v1/users/sign-up", formData);
      console.log(res);
      if (res.ok) {
        return { isValid: true, response: res };
      }
    } catch (e) {
      const isError = ErrorSchema.safeParse(e);
      if (isError.success) {
        console.log((e as Error).message);
      } else console.log(e);
      return { isValid: false };
    }
  }
  return { isValid: false, errors: validatedForm.error?.flatten().fieldErrors };
}
