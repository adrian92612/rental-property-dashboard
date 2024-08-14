"use server";

import { auth, signIn, signOut } from "@/auth";
import prisma from "./prisma";
import { createId } from "@paralleldrive/cuid2";
import { revalidatePath } from "next/cache";
import { Property, Unit } from "@prisma/client";
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

export const getTenants = async () => await prisma.tenant.findMany();

export const addProperty = async (prevState: any, formData: FormData) => {
  try {
    const userId = await getUserId();
    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const units = parseInt(formData.get("units") as string, 10);

    if (!name) return { ...prevState, error: "Property name is required", success: "" };
    if (!address) return { ...prevState, error: "Property address is required", success: "" };

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

export const addTenant = async (prevState: any, formData: FormData) => {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const leaseStartValue = formData.get("leaseStart") as string;
    const leaseEndValue = formData.get("leaseEnd") as string;

    // Check for missing values
    if (!firstName) return { ...prevState, error: "First name is required" };
    if (!lastName) return { ...prevState, error: "Last name is required" };
    if (!email) return { ...prevState, error: "Email is required" };
    if (!phoneNumber) return { ...prevState, error: "Phone number is required" };
    if (!leaseStartValue) return { ...prevState, error: "Lease start date is required" };
    if (!leaseEndValue) return { ...prevState, error: "Lease end date is required" };

    // Convert dates to Date objects
    const leaseStart = new Date(leaseStartValue);
    const leaseEnd = new Date(leaseEndValue);

    await prisma.tenant.create({
      data: {
        id: createId(),
        firstName,
        lastName,
        email,
        phoneNumber,
        leaseStart,
        leaseEnd,
      },
    });

    revalidatePath("/dashboard/tenants");
    return { success: `${firstName} ${lastName} has been added to Tenants`, error: "" };
  } catch (error) {
    console.log("Failed to add tenant: ", error);
    return { ...prevState, error: "Failed to add tenant" };
  }
};
