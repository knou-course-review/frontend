"use server";

import { getSession } from "@/lib/auth";
import { ErrorSchema } from "@/schema/error";
import { api } from "@/utils/api";

type ReportObject = {
  content: string;
};

export async function reportUser(userId: string, reportBody: ReportObject) {
  const userSession = await getSession();
  if (!userSession.isLoggedIn || !userSession.token) return { isValid: false };

  try {
    const res = await api.post(`/api/v1/report/${userId}`, reportBody, userSession.token);
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
