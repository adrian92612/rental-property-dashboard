"use server";

import { Property, Tenant, Unit } from "@prisma/client";
import { getUserId } from "./actions";
import prisma from "./prisma";
import { createId } from "@paralleldrive/cuid2";
import { revalidatePath } from "next/cache";

export type PropertyWithUnits = Property & {
  units: Unit[];
};

export type PropertyWithUnitsAndTenant = Property & {
  units: (Unit & {
    tenant: Tenant | null;
  })[];
};

export const getProperties = async (): Promise<Property[] | null> => {
  try {
    const userId = await getUserId();
    const properties = prisma.property.findMany({ where: { userId: userId } });
    return properties;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getPropertiesWithUnits = async (): Promise<
  PropertyWithUnits[] | null
> => {
  try {
    const userId = await getUserId();
    const properties = await prisma.property.findMany({
      where: { userId: userId },
      include: { units: true },
    });
    return properties;
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return null;
  }
};

export const getPropertyWithUnitsAndTenants = async (
  propertyId: string
): Promise<PropertyWithUnitsAndTenant | null> => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      include: {
        units: {
          include: {
            tenant: true,
          },
        },
      },
    });

    return property;
  } catch (error) {
    console.log("Failed to fetch properties: ", error);
    return null;
  }
};

export const upsertProperty = async (prevState: any, formData: FormData) => {
  try {
    const userId = await getUserId();
    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const units = parseInt(formData.get("units") as string, 10);
    const propertyId = formData.get("propertyId") as string | undefined;

    prevState = {
      name,
      address,
      units,
    };

    if (!name) return { ...prevState, error: "Property name is required" };
    if (!address)
      return { ...prevState, error: "Property address is required" };
    if (!propertyId && !units)
      return { ...prevState, error: "Minimum of 1 unit is required" };

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
      return {
        updateSuccess: `${property.name} has been successfully updated`,
      };
    }

    const unitData = Array.from({ length: units }, (_, i) => ({
      id: createId(),
      number: `Unit ${i + 1}`,
      rentAmount: 0,
      propertyId: property.id,
    }));

    await prisma.unit.createMany({ data: unitData });

    revalidatePath("/dashboard/properties");
    return {
      success: `${name} with ${units} units created successfully.`,
      error: "",
    };
  } catch (error) {
    console.log(error);
    return {
      ...prevState,
      error: "Failed to create/update property and unit/s.",
      success: "",
    };
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
    return {
      success: false,
      message: `Failed to delete property ${propertyId}.`,
      error,
    };
  }
};

// export const getProperty = async (
//   propertyId: string,
//   withUnits: boolean = true,
//   withTenant: boolean = true
// ): Promise<
//   Property | PropertyWithUnits | PropertyWithUnitsAndTenant | null
// > => {
//   try {
//     const property = await prisma.property.findUnique({
//       where: { id: propertyId },
//       include: withUnits
//         ? {
//             units: {
//               include: withTenant ? { tenant: true } : undefined,
//             },
//           }
//         : undefined,
//     });

//     return property;
//   } catch (error) {
//     console.error("Failed to fetch property:", error);
//     throw new Error("Failed to fetch property");
//   }
// };
