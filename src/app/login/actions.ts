"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";

const testUser = {
  id: "1",
  email: "john@doe.com",
  password: "password",
};

const loginSchema = z.object({
  email: z.string().email("This is not a valid email.").trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  const res = loginSchema.safeParse(Object.fromEntries(formData));
  if (!res.success) {
    return { errors: res.error.flatten().fieldErrors };
  }

  const { email, password } = res.data;

  if (email !== testUser.email || password !== testUser.password) {
    return { errors: { email: ["Invalid email or password"] } };
  }

  await createSession(testUser.id);
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
