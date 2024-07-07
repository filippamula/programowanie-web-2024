"use server";

import { z } from "zod";
import { authSchema } from "../formSchema";
import { findUserByUsername } from "../db";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { jwtPayload } from "../model/types";

const jwtKey = new TextEncoder().encode(process.env.JWT_KEY);
const jwtAlg = "HS256";
const authTokenCookie = "authToken";

export const authenticate = async (formData: z.infer<typeof authSchema>) => {
  const username = formData.username;
  const password = formData.password;

  if (!username) {
    return {
      error: "Username can't be empty",
    };
  }
  if (!password) {
    return {
      error: "Password can't be empty",
    };
  }

  const user = await findUserByUsername(username);

  if (!user || password !== user.password) {
    return {
      error: "Invalid username or passord",
    };
  }

  setAuthCookie(
    await generateJwtToken({ id: user.id, username: user.username })
  );

  redirect("/");
};

export const setAuthCookie = async (token: string) => {
  cookies().set(authTokenCookie, token);
};

export const generateJwtToken = async (payload: jwtPayload) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: jwtAlg })
    .setExpirationTime("1h")
    .sign(jwtKey);
};

export const getUserFromAuthToken = async () => {
  const token = cookies().get(authTokenCookie)?.value;
  if (!token) return null;

  var payload = (await decryptJwtTokenPayload(token)) as jwtPayload;
  if (payload === null) return null;
  return await findUserByUsername(payload.username);
};

export const decryptJwtTokenPayload = async (token: string) => {
  try {
    return (await jwtVerify(token, jwtKey, { algorithms: [jwtAlg] })).payload;
  } catch {
    return null;
  }
};

export const refreshAuthToken = async () => {
  const user = await getUserFromAuthToken();
  if (!user) {
    return null;
  }
  await setAuthCookie(
    await generateJwtToken({ id: user.id, username: user.username })
  );
};
