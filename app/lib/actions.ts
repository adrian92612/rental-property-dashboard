"use server";

import { auth, signIn, signOut } from "@/auth";
import prisma from "./prisma";
import { createId } from "@paralleldrive/cuid2";
import { revalidatePath } from "next/cache";

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
  const properties = await prisma.property.findMany({
    where: { userId: userId },
    include: { units: true },
  });
  return properties;
};

export const getUnits = async (propertyId: string) => {
  const units = await prisma.unit.findMany({ where: { propertyId: propertyId } });
  return units;
};

export const addProperty = async (prevState: any, formData: FormData) => {
  try {
    console.log(formData);
    console.log(prevState);
    const userId = await getUserId();
    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const units = parseInt(formData.get("units") as string, 10);

    const property = await prisma.property.create({
      data: {
        id: createId(),
        name,
        address,
        user: {
          connect: { id: userId },
        },
      },
    });

    const unitPromises = [];
    for (let i = 1; i <= units; i++) {
      const unitId = createId();
      unitPromises.push(
        prisma.unit.create({
          data: {
            id: unitId,
            number: `Unit ${i} - ${unitId}}`,
            rentAmount: 0,
            property: {
              connect: { id: property.id },
            },
          },
        })
      );
    }

    await Promise.all(unitPromises);
    revalidatePath("/dashboard/properties");
    return { message: `${name} with ${units} units created successfully.` };
  } catch (error) {
    console.log(error);
    return { ...prevState, message: "Failed to create property and unit/s." };
  }
};
