"use server";

import { auth, signIn, signOut } from "@/auth";
import prisma from "./prisma";
import { cloudinary } from "./cloudinary-config";
import { userRegisterSchema } from "./schemas/user-register-schema";
import { createId } from "@paralleldrive/cuid2";
import { genSalt, hashSync } from "bcrypt-ts";

export const registerUser = async (prevState: any, formData: FormData) => {
  console.log(formData);
  const data = {
    email: formData.get("email") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  prevState = { ...data };
  const parsedData = userRegisterSchema.safeParse(data);

  if (!parsedData.success) {
    const fieldErrors = parsedData.error.flatten().fieldErrors;
    return { ...prevState, fieldErrors };
  }

  const { email, firstName, lastName, password } = parsedData.data;

  try {
    const isEmailUnique = await prisma.user.findUnique({
      where: { email: email },
    });

    if (isEmailUnique) {
      return {
        ...prevState,
        error: "Email address is already registered to another user",
      };
    }

    const salt = await genSalt(10);
    const hashedPassword = hashSync(password, salt);
    await prisma.user.create({
      data: {
        id: createId(),
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hashedPassword,
      },
    });
    return { success: "User successfully created" };
  } catch (error) {
    console.error("Failed to register user: ", error);
    return {
      ...prevState,
      error: "Something went wrong. Failed to register user",
    };
  }
};

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
