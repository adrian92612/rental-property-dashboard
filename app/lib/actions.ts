"use server";

import { auth, signIn, signOut } from "@/auth";
import prisma from "./prisma";
import { cloudinary } from "./cloudinary-config";

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

export const uploadImage = async (image: File): Promise<string | undefined> => {
  try {
    let imageUrl: string | undefined;
    if (image && image.type.startsWith("image/")) {
      const arrayBuffer = await image.arrayBuffer();
      const base64Data = Buffer.from(arrayBuffer).toString("base64");
      const dataURI = `data:${image.type};base64,${base64Data}`;

      const res = await cloudinary.uploader.upload(dataURI);
      imageUrl = res.secure_url;
    }
    return imageUrl;
  } catch (error) {
    console.error("Failed to upload image: ", error);
  }
};
