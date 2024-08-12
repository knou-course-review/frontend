"use server";

import { getSession } from "@/lib/auth";
import { ErrorSchema } from "@/schema/error";
import { api } from "@/utils/api";

type UserReview = {
  content: string;
};

export async function postReview(courseId: string, userReview: UserReview) {
  const userSession = await getSession();
  if (!userSession.isLoggedIn || !userSession.token) return { isValid: false };

  try {
    const res = await api.post(`/api/v1/course/${courseId}/review`, userReview, userSession.token);
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

export async function editReview(reviewId: string, newReview: UserReview) {
  const userSession = await getSession();
  if (!userSession.isLoggedIn || !userSession.token) return { isValid: false };

  try {
    const res = await api.put(`/api/v1/review/${reviewId}`, newReview, userSession.token);
    console.log(res);
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

export async function deleteReview(reviewId: string) {
  const userSession = await getSession();
  if (!userSession.isLoggedIn || !userSession.token) return { isValid: false };

  try {
    const res = await api.delete(`/api/v1/review/${reviewId}`, userSession.token);
    console.log(res);
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
