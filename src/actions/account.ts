"use server";

import { deleteSession, getSession } from "@/lib/auth";
import { ErrorSchema } from "@/schema/error";
import { TerminationFormSchema } from "@/schema/account-termination";
import { api } from "@/utils/api";

export async function getAccountInfo() {
  const userSession = await getSession();
  if (!userSession.isLoggedIn || !userSession.token) return { isValid: false };

  try {
    const res = await api.get("/api/v1/users", userSession.token);
    if (res.status === 200) {
      const body = await res.json();
      return body.data;
    }
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function terminateAccount(data: { isChecked: boolean }) {
  const userSession = await getSession();
  if (!userSession.isLoggedIn || !userSession.token) return { isValid: false };

  const validatedForm = TerminationFormSchema.safeParse(data);

  if (validatedForm.success) {
    try {
      const res = await api.delete("/api/v1/users", userSession.token);
      console.log(res);
      if (res.ok) {
        await deleteSession();
        return { isValid: true };
      }
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
