"use server";

import { signIn, signOut } from "@/auth";

export const login = async (formData: FormData) => {
  const provider = formData.get("action") as string | null;
  if (provider) await signIn(provider, { redirectTo: "/dashboard" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
