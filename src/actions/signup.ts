"use server";

import { ErrorSchema } from "@/schema/error";
import { SignupFormSchema } from "@/schema/signup";
import { api } from "@/utils/api";

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
    if (res.ok) {
      return { isValid: true };
    }
  } catch (e) {
    const isError = ErrorSchema.safeParse(e);
    if (isError.success) {
      console.log((e as Error).message);
    }
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

export async function checkCode(body: { email: string; code: string }) {
  try {
    const res = await api.put("/api/v1/mail", body);
    console.log(res);
    if (res.ok) {
      const body = await res.json();
      console.log(body);
      return { isValid: body.data.confirm };
    }
  } catch (e) {
    const isError = ErrorSchema.safeParse(e);
    if (isError.success) {
      console.log((e as Error).message);
    } else console.log(e);
  }
  return { isValid: false };
}

export async function signup(formData: any) {
  const validatedForm = SignupFormSchema.safeParse(formData);
  if (validatedForm.success) {
    try {
      const signupData = {
        username: formData.username.name,
        email: formData.email.email,
        password: formData.password,
      };
      const res = await api.post("/api/v1/users/sign-up", signupData);
      console.log(res);
      if (res.ok) {
        const body = await res.json();
        console.log(body);
        return { isValid: true };
      }
    } catch (e) {
      const isError = ErrorSchema.safeParse(e);
      if (isError.success) {
        console.log((e as Error).message);
      } else console.log(e);
      return { isValid: false, errors: { unknown: ["* 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."] } };
    }
  }
  if (validatedForm.error) {
    console.log(validatedForm.error?.flatten().fieldErrors);
    return { isValid: false, errors: validatedForm.error?.flatten().fieldErrors };
  }
  console.log("Unknown error");
  return { isValid: false, errors: { unknown: ["* 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."] } };
}
