"use server";

import { auth, signIn, signOut } from "@/auth";
import prisma from "./prisma";
import { createId } from "@paralleldrive/cuid2";
import { revalidatePath } from "next/cache";
import { Property, Unit } from "@prisma/client";
import { create } from "domain";
import { error } from "console";

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

export interface PropertyWithUnits extends Property {
  units: Unit[];
}

export const getProperties = async () => {
  const userId = await getUserId();
  return await prisma.property.findMany({
    where: { userId: userId },
  });
};

export const getPropertiesWithUnits = async () => {
  const userId = await getUserId();
  return await prisma.property.findMany({
    where: { userId: userId },
    include: { units: true },
  });
};

export const getUnits = async (propertyId: string) => {
  const units = await prisma.unit.findMany({ where: { propertyId: propertyId } });
  return units;
};

export const addProperty = async (prevState: any, formData: FormData) => {
  try {
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

    const unitData = Array.from({ length: units }, (_, i) => ({
      id: createId(),
      number: `Unit ${i + 1}`,
      rentAmount: 0,
      propertyId: property.id,
    }));

    await prisma.unit.createMany({ data: unitData });

    revalidatePath("/dashboard/properties");
    return { success: `${name} with ${units} units created successfully.`, error: "" };
  } catch (error) {
    console.log(error);
    return { ...prevState, error: "Failed to create property and unit/s.", success: "" };
  }
};

export const addUnit = async (prevState: any, formData: FormData) => {
  try {
    const propertyId = formData.get("propertyId") as string;
    const number = formData.get("number") as string;
    const rentAmount = parseFloat(formData.get("rent") as string);
    const dueDate = parseInt(formData.get("dueDate") as string);

    if (!propertyId) return { ...prevState, error: "Property Id not found", success: "" };
    if (!number) return { ...prevState, error: "Unit Number not found", success: "" };

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: { name: true },
    });

    if (!property) return { ...prevState, error: "Property not found.", success: "" };

    await prisma.unit.create({
      data: {
        id: createId(),
        number,
        rentAmount,
        dueDate,
        property: {
          connect: { id: propertyId },
        },
      },
    });

    revalidatePath("/dashboard/units");
    return { success: `${number} is added to ${property.name}` };
  } catch (error) {
    console.log("Failed to add unit: ", error);
    return { ...prevState, error: "Failed to add unit" };
  }
};
