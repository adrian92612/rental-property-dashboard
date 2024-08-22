import { Tenant, Unit } from "@prisma/client";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { createId } from "@paralleldrive/cuid2";

export type TenantWithUnit = Tenant & {
  unit: Unit | null;
};

export const getTenants = async (): Promise<Tenant[] | null> => {
  try {
    const tenants = await prisma.tenant.findMany();
    return tenants;
  } catch (error) {
    console.log("Failed to fetch tenants: ", error);
    return null;
  }
};

export const getTenantWithUnit = async (
  tenantId: string
): Promise<TenantWithUnit | null> => {
  try {
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      include: { unit: true },
    });
    return tenant;
  } catch (error) {
    console.log("Failed to fetch tenant: ", error);
    return null;
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
  if (!phoneNumber)
    return { ...currentState, error: "Phone number is required" };
  if (!leaseStartValue)
    return { ...currentState, error: "Lease start date is required" };
  if (!leaseEndValue)
    return { ...currentState, error: "Lease end date is required" };

  try {
    const existingTenant = await prisma.tenant.findUnique({
      where: { email },
    });

    if (existingTenant && existingTenant.id !== tenantId) {
      return {
        ...currentState,
        error: "A tenant with this email already exists.",
      };
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
      };
    }

    revalidatePath("/dashboard/tenants");
    return {
      success: `${firstName} ${lastName} has been added to Tenants`,
      error: "",
    };
  } catch (error) {
    const msg = `Failed to ${tenantId ? "update" : "add"} tenant`;
    console.log(msg, error);
    return { ...currentState, error: msg };
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
    return {
      success: false,
      message: `Failed to delete tenant ${tenantId}.`,
      error,
    };
  }
};
