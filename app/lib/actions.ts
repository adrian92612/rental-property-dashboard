"use server";

import { auth, signIn, signOut } from "@/auth";
import prisma from "./prisma";

export const login = async (formData: FormData) => {
  const provider = formData.get("action") as string | null;
  if (provider) await signIn(provider, { redirectTo: "/dashboard" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

export const getUser = async () => {
  const id = await getUserId();
  return prisma.user.findUnique({ where: { id: id } });
};

export const getUserId = async () => {
  const session = await auth();
  return session?.user?.id as string;
};
