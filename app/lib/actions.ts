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

export const getUserId = async () => {
  const session = await auth();
  return session?.user?.id as string;
};

export const getProperties = async (userId: string) => {
  const properties = await prisma.property.findMany({ where: { userId: userId } });
  return properties;
};
