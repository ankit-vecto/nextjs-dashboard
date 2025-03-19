import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import type { Req, User } from "@/app/lib/definitions";
import postgres from "postgres";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(3),
});

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (!parsedCredentials.success) return null;
        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);
        if (!user) return null;
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;
        return user;
      },
    }),
  ],
});

export default async function signupHandler(
  req: Req
  // res: NextApiResponse
): Promise<void> {
  if (req.method !== "POST") {
    alert("method not supported");
    return;
  }
  const parsedData = registerSchema.safeParse(req.body);
  if (!parsedData.success) {
    alert("Invalid input data");
    return;
  }
  const { email, password, name } = parsedData.data;
  try {
    const existingUser = await getUser(email);
    if (existingUser) {
      alert("Email already exists");
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await sql`INSERT INTO users (email, password, name) VALUES (${email}, ${hashedPassword}, ${name})`;
    alert("User created successfully");
    return;
  } catch (error) {
    console.error("Registration error:", error);
    alert("Internal server error");
    return;
  }
}
