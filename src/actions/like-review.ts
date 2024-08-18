"use server";

import { getSession } from "@/lib/auth";
import { ErrorSchema } from "@/schema/error";

export async function likeReview(reviewId: string) {
  const userSession = await getSession();
  if (!userSession.isLoggedIn || !userSession.token) return { isValid: false };

  try {
    const res = await fetch(`${process.env.SERVER_URL}/api/v1/like/${reviewId}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + userSession.token,
      },
    });
    if (res.ok) {
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

export async function cancelLike(reviewId: string) {
  const userSession = await getSession();
  if (!userSession.isLoggedIn || !userSession.token) return { isValid: false };

  try {
    const res = await fetch(`${process.env.SERVER_URL}/api/v1/like/${reviewId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + userSession.token,
      },
    });
    if (res.ok) {
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
