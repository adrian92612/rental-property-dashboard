"use server";

import { auth, signIn, signOut } from "@/auth";
import prisma from "./prisma";
import { createId } from "@paralleldrive/cuid2";
import { revalidatePath } from "next/cache";
import { Property, Tenant, Unit } from "@prisma/client";

export interface PropertyWithUnits extends Property {
  units: Unit[];
}

export interface UnitWithTenant extends Unit {
  tenant: Tenant;
}

export interface TenantWithUnit extends Tenant {
  unit: Unit;
}

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

export const getProperty = async (
  propertyId: string,
  withUnits: boolean = true
): Promise<Property | PropertyWithUnits> => {
  if (withUnits) {
    return (await prisma.property.findUnique({
      where: { id: propertyId },
      include: { units: true },
    })) as PropertyWithUnits;
  }
  return (await prisma.property.findUnique({ where: { id: propertyId } })) as Property;
};

export const getUnits = async (propertyId: string) => {
  const units = await prisma.unit.findMany({ where: { propertyId: propertyId } });
  return units;
};

export const getUnit = async (unitId: string) => {
  return await prisma.unit.findUnique({ where: { id: unitId }, include: { tenant: true } });
};

export const getTenants = async () => await prisma.tenant.findMany();

export const getTenant = async (tenantId: string) =>
  await prisma.tenant.findUnique({ where: { id: tenantId }, include: { unit: true } });

export const upsertProperty = async (prevState: any, formData: FormData) => {
  try {
    const userId = await getUserId();
    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const units = parseInt(formData.get("units") as string, 10);
    const propertyId = formData.get("propertyId") as string | undefined;

    if (!name) return { ...prevState, error: "Property name is required", success: "" };
    if (!address) return { ...prevState, error: "Property address is required", success: "" };

    const property = await prisma.property.upsert({
      where: { id: propertyId ?? "" },
      update: {
        name,
        address,
      },
      create: {
        id: createId(),
        name,
        address,
        user: {
          connect: { id: userId },
        },
      },
    });

    if (propertyId) {
      return { ...prevState, error: "", success: `${property.name} has been successfully updated` };
    }

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
    return { ...prevState, error: "Failed to create/update property and unit/s.", success: "" };
  }
};

export const upsertUnit = async (prevState: any, formData: FormData) => {
  const unitId = formData.get("unitId") as string | undefined;
  const tenantId = formData.get("tenantId") as string | undefined;
  const propertyId = formData.get("propertyId") as string;
  const number = formData.get("number") as string;
  const rentAmount = parseFloat(formData.get("rentAmount") as string);
  const dueDate = parseInt(formData.get("dueDate") as string);

  const currentState = {
    ...prevState,
    number,
    rentAmount,
    dueDate,
    tenantId,
  };

  if (!propertyId) return { ...currentState, error: "Property Id not found", success: "" };
  if (!number) return { ...currentState, error: "Unit Number not found", success: "" };

  try {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: { name: true },
    });

    if (!property) return { ...currentState, error: "Property not found.", success: "" };

    await prisma.unit.upsert({
      where: { id: unitId ?? "" },
      update: {
        number,
        rentAmount,
        dueDate,
        ...(tenantId && {
          tenant: {
            connect: { id: tenantId },
          },
        }),
      },
      create: {
        id: createId(),
        number,
        rentAmount,
        dueDate,
        property: {
          connect: { id: propertyId },
        },
      },
    });

    if (unitId) {
      return { ...currentState, error: "", success: `${number} was successfully updated.` };
    }

    revalidatePath("/dashboard/units");
    return { success: `${number} is added to ${property.name}` };
  } catch (error) {
    console.log("Failed to add unit: ", error);
    return { ...currentState, error: "Failed to add unit" };
  }
};

export const upsertTenant = async (prevState: any, formData: FormData) => {
  const tenantId = formData.get("tenantId") as string;
  const unitId = formData.get("unitId") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const leaseStartValue = formData.get("leaseStart") as string;
  const leaseEndValue = formData.get("leaseEnd") as string;
  const termInMonths = parseInt(formData.get("termInMonths") as string);

  // Convert dates to Date objects
  const leaseStart = new Date(leaseStartValue);
  const leaseEnd = new Date(leaseEndValue);

  const currentState = {
    ...prevState,
    firstName,
    lastName,
    email,
    phoneNumber,
    leaseStart,
    leaseEnd,
    termInMonths,
  };

  // Check for missing values
  if (!firstName) return { ...currentState, error: "First name is required" };
  if (!lastName) return { ...currentState, error: "Last name is required" };
  if (!email) return { ...currentState, error: "Email is required" };
  if (!phoneNumber) return { ...currentState, error: "Phone number is required" };
  if (!leaseStartValue) return { ...currentState, error: "Lease start date is required" };
  if (!leaseEndValue) return { ...currentState, error: "Lease end date is required" };

  try {
    const existingTenant = await prisma.tenant.findUnique({
      where: { email },
    });

    if (existingTenant && existingTenant.id !== tenantId) {
      return { ...currentState, error: "A tenant with this email already exists." };
    }

    await prisma.tenant.upsert({
      where: { id: tenantId ?? "" },
      update: {
        firstName,
        lastName,
        email,
        phoneNumber,
        termInMonths,
        leaseStart,
        leaseEnd,
        ...(unitId && {
          unit: {
            connect: { id: unitId },
          },
        }),
      },
      create: {
        id: createId(),
        firstName,
        lastName,
        email,
        phoneNumber,
        termInMonths,
        leaseStart,
        leaseEnd,
      },
    });

    if (tenantId) {
      return {
        updateSuccess: `${firstName} ${lastName} has been successfully updated.`,
        error: "",
      };
    }

    revalidatePath("/dashboard/tenants");
    return { success: `${firstName} ${lastName} has been added to Tenants`, error: "" };
  } catch (error) {
    const msg = `Failed to ${tenantId ? "update" : "add"} tenant`;
    console.log(msg, error);
    return { ...currentState, error: msg };
  }
};

export const deleteProperty = async (propertyId: string) => {
  try {
    await prisma.$transaction(async (prisma) => {
      // Delete all units associated with the property
      await prisma.unit.deleteMany({ where: { propertyId } });

      // Delete the property itself
      await prisma.property.delete({ where: { id: propertyId } });
    });

    revalidatePath("/dashboard/properties");
    return {
      success: true,
      message: `Property ${propertyId} and associated units deleted successfully.`,
    };
  } catch (error) {
    console.error("Failed to delete property: ", error);
    return { success: false, message: `Failed to delete property ${propertyId}.`, error };
  }
};

export const deleteUnit = async (unitId: string) => {
  try {
    await prisma.unit.delete({ where: { id: unitId } });
    return {
      success: true,
      message: `Unit ${unitId} deleted successfully.`,
    };
  } catch (error) {
    console.error("Failed to delete unit: ", error);
    return { success: false, message: `Failed to delete unit ${unitId}.`, error };
  }
};

export const deleteTenant = async (tenantId: string) => {
  try {
    await prisma.tenant.delete({ where: { id: tenantId } });
    return {
      success: true,
      message: `Tenant ${tenantId} deleted successfully.`,
    };
  } catch (error) {
    console.error("Failed to delete tenant: ", error);
    return { success: false, message: `Failed to delete tenant ${tenantId}.`, error };
  }
};
