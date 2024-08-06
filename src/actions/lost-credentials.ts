"use server";

import { ErrorSchema } from "@/schema/error";
import { api } from "@/utils/api";

export async function getUsername(email: string) {
  try {
    const res = await api.post("/api/v1/users/find-username", { email });
    if (res.ok) {
      const body = await res.json();
      return { isValid: true, data: body.data };
    }
  } catch (e) {
    const isError = ErrorSchema.safeParse(e);
    if (isError.success) {
      console.log((e as Error).message);
    }
  }
  return { isValid: false };
}

export async function getPasswordAccess(form: { username: string; email: string }) {
  try {
    const res = await api.post("/api/v1/users/find-password", form);
    if (res.ok) {
      const body = await res.json();
      console.log(body);
      return { isValid: true };
    }
  } catch (e) {
    const isError = ErrorSchema.safeParse(e);
    if (isError.success) {
      console.log((e as Error).message);
    }
  }
  return { isValid: false };
}

export async function changePassword(form: { email: string; password: string; rePassword: string }) {
  try {
    const res = await api.put("/api/v1/users/change-password", form);
    if (res.ok) {
      const body = await res.json();
      console.log(body);
      return { isValid: true };
    }
  } catch (e) {
    const isError = ErrorSchema.safeParse(e);
    if (isError.success) {
      console.log((e as Error).message);
    }
  }
  return { isValid: false };
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
  }
  return { isValid: false };
}

export async function checkCode(body: { email: string; code: string }) {
  console.log(body);
  try {
    const res = await api.put("/api/v1/mail", body);
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
