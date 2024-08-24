import { z } from "zod";

export const propertySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Property name is required")
    .max(100, "Cannot be more than 100 characters"),
  address: z
    .string()
    .trim()
    .min(1, "Address is required")
    .max(100, "Cannot be more than 100 characters"),
  units: z
    .number()
    .int("Must be a whole number")
    .min(1, "There must be at least 1 unit")
    .optional(),
  propertyId: z.string().optional(),
});

export type PropertyFormData = z.infer<typeof propertySchema>;
