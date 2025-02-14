import { jwtVerify, SignJWT } from "jose";
import "server-only";

const secretKey = process.env.SESSION_SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  userId: string;
  expireAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined="") {
  try{
    const payload = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload.payload;
  } catch {
    console.error("Failed to decrypt session token");
  }
}
