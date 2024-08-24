"use server";

import { Unit, Tenant } from "@prisma/client";
import prisma from "./prisma";
import { createId } from "@paralleldrive/cuid2";
import { revalidatePath } from "next/cache";
import { UnitFormData, unitSchema } from "./schemas/unit-schema";

export type UnitWithTenant = Unit & { tenant: Tenant | null };

export type UnitWithPropertyTenantName = Unit & {
  property: {
    name: string;
  } | null;
  tenant: {
    id: string;
    firstName: string;
    lastName: string;
  } | null;
};

export const getUnit = async (unitId: string): Promise<Unit | null> => {
  try {
    const unit = await prisma.unit.findUnique({
      where: { id: unitId },
    });

    return unit;
  } catch (error) {
    console.error("Failed to fetch unit:", error);
    return null;
  }
};

export const getUnitWithTenant = async (
  unitId: string
): Promise<UnitWithTenant | null> => {
  try {
    const unit = await prisma.unit.findUnique({
      where: { id: unitId },
      include: { tenant: true },
    });
    return unit;
  } catch (error) {
    console.log("Failed to fetch unit: ", error);
    return null;
  }
};

export const getUnitWithPropertyTenantName = async (): Promise<
  UnitWithPropertyTenantName[] | null
> => {
  try {
    const units = await prisma.unit.findMany({
      include: {
        property: {
          select: {
            id: true,
            name: true,
          },
        },
        tenant: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return units;
  } catch (error) {
    console.log("Failed to fetch units: ", error);
    return null;
  }
};

// export const upsertUnit = async (prevState: any, formData: FormData) => {
//   const unitId = formData.get("unitId") as string | undefined;
//   const tenantId = formData.get("tenantId") as string | undefined;
//   const propertyId = formData.get("propertyId") as string;
//   const number = formData.get("number") as string;
//   const rentAmount = parseFloat(formData.get("rentAmount") as string);
//   const dueDate = parseInt(formData.get("dueDate") as string);

//   const currentState = {
//     ...prevState,
//     number,
//     rentAmount,
//     dueDate,
//     tenantId,
//     propertyId,
//   };

//   if (!propertyId) return { ...currentState, error: "Property Id not found" };
//   if (!number) return { ...currentState, error: "Unit Number not found" };

//   try {
//     const property = await prisma.property.findUnique({
//       where: { id: propertyId },
//       select: { name: true },
//     });

//     if (!property) return { ...currentState, error: "Property not found." };

//     await prisma.unit.upsert({
//       where: { id: unitId ?? "" },
//       update: {
//         number,
//         rentAmount,
//         dueDate,
//         ...(tenantId && {
//           tenant: {
//             connect: { id: tenantId },
//           },
//         }),
//       },
//       create: {
//         id: createId(),
//         number,
//         rentAmount,
//         dueDate,
//         property: {
//           connect: { id: propertyId },
//         },
//       },
//     });

//     if (unitId) {
//       return {
//         ...currentState,
//         updateSuccess: `${number} was successfully updated.`,
//       };
//     }

//     revalidatePath("/dashboard/units");
//     return { success: `${number} is added to ${property.name}` };
//   } catch (error) {
//     console.log("Failed to add unit: ", error);
//     return { ...currentState, error: "Failed to add unit" };
//   }
// };

export const upsertUnit = async (prevState: any, formData: FormData) => {
  const data: UnitFormData = {
    unitId: (formData.get("unitId") as string) ?? undefined,
    tenantId: formData.get("tenantId") as string,
    propertyId: (formData.get("propertyId") as string) ?? "",
    number: formData.get("number") as string,
    rentAmount: parseFloat(formData.get("rentAmount") as string) ?? 0,
    dueDate: parseInt(formData.get("dueDate") as string) ?? 1,
  };

  prevState = { ...data };

  const parsedData = unitSchema.safeParse(data);

  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors;
    return { ...prevState, errors };
  }
  const { unitId, tenantId, propertyId, number, rentAmount, dueDate } =
    parsedData.data;

  try {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: { name: true },
    });

    if (!property) return { ...prevState, error: "Property not found" };

    await prisma.unit.upsert({
      where: { id: unitId ?? "" },
      update: {
        number,
        rentAmount,
        dueDate,
        tenant: tenantId
          ? {
              connect: { id: tenantId },
            }
          : { disconnect: true },
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
      return {
        success: `${number} was successfully updated, redirecting to unit details...`,
      };
    }

    revalidatePath("/dashboard/units");
    return { success: `${number} is added to ${property.name}` };
  } catch (error) {
    console.log("Failed to add unit: ", error);
    return { ...prevState, error: "Failed to add unit" };
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
    return {
      success: false,
      message: `Failed to delete unit ${unitId}.`,
      error,
    };
  }
};
