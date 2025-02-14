import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import "server-only";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  userId: string;
  expireAt: Date;
};

export async function createSession(userId: string) {
  const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({
    userId,
    expireAt,
  });

  (await cookies()).set("session", session, {
    httpOnly: true,
    expires: expireAt,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function deleteSession() {
  (await cookies()).delete("session");
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session"+error);
  }
}