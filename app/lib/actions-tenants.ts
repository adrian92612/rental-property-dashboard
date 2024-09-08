"use server";

import { Tenant, Unit } from "@prisma/client";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { createId } from "@paralleldrive/cuid2";
import { TenantFormData, tenantSchema } from "./schemas/tenant-schema";

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

export const getTenant = async (
  tenantId: string
): Promise<TenantWithUnit | null> => {
  try {
    const tenant = prisma.tenant.findUnique({
      where: {
        id: tenantId,
      },
      include: { unit: true },
    });
    return tenant;
  } catch (error) {
    console.log("Failed to fetch tenant", error);
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
  const data: TenantFormData = {
    tenantId: (formData.get("tenantId") as string) ?? undefined,
    unitId: (formData.get("unitId") as string) ?? undefined,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    termInMonths: parseInt(formData.get("termInMonths") as string, 10),
    leaseStart: new Date(formData.get("leaseStart") as string),
    leaseEnd: new Date(formData.get("leaseEnd") as string),
  };

  prevState = { ...data };
  const parsedData = tenantSchema.safeParse(data);

  if (!parsedData.success) {
    const fieldErrors = parsedData.error.flatten().fieldErrors;
    return { ...prevState, fieldErrors };
  }

  const {
    tenantId,
    unitId,
    firstName,
    lastName,
    email,
    phoneNumber,
    termInMonths,
    leaseStart,
    leaseEnd,
  } = parsedData.data;

  try {
    const existingTenant = await prisma.tenant.findUnique({
      where: { email },
    });

    if (existingTenant && existingTenant.id !== tenantId) {
      return {
        ...prevState,
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
        success: `${firstName} ${lastName} has been successfully updated.`,
      };
    }

    revalidatePath("/dashboard/tenants");
    return {
      success: `${firstName} ${lastName} has been added to Tenants`,
    };
  } catch (error) {
    const msg = `Failed to ${tenantId ? "update" : "add"} tenant`;
    console.log(msg, error);
    return { ...prevState, error: msg };
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
    };
  }
};
