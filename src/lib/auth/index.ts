import "server-only";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

type UserJwtPayload = {
  id: number;
  role: string;
  iat: number;
  exp: number;
};

type SessionPayload = {
  username: string;
  expiresAt: Date;
};

const cookieOptions = {
  name: "knous",
  duration: 24 * 60 * 60 * 1000,
};

export async function encrypt(payload: SessionPayload) {
  const key = getJwtSecretKey();
  return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("1hr").sign(key);
}

export async function decrypt(session: string | undefined = "") {
  const key = getJwtSecretKey();
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

// Functions for JWT verification
export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  console.log(secret);
  if (!secret || secret.length === 0) {
    throw new Error("Missing JWT secret key.");
  }
  return new TextEncoder().encode(secret);
};

export const verifyAuth = async (token: string) => {
  try {
    const jwtSecret = getJwtSecretKey();
    const { payload } = await jwtVerify(token, jwtSecret);
    return payload as UserJwtPayload;
  } catch (error) {
    throw error;
  }
};

// Session functions
export async function createSession(username: string) {
  const expiresAt = new Date(Date.now() + cookieOptions.duration);
  const session = await encrypt({ username, expiresAt });

  cookies().set(cookieOptions.name, session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function saveServerSession(accessToken: string) {
  cookies().set(cookieOptions.name, accessToken, {
    httpOnly: true,
    secure: true,
    expires: Date.now() + cookieOptions.duration,
    sameSite: "lax",
    path: "/",
  });
}

export async function checkSession() {
  const cookie = cookies().get("knous")?.value;
  if (!cookie) return { isLoggedIn: false };
  return { isLoggedIn: true };
}

export async function deleteSession() {
  const cookie = cookies().get("knous")?.value;
  if (!cookie) return;
  cookies().set("knous", "", { expires: new Date(0) });
}
