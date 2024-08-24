import { z } from "zod";

export const unitSchema = z.object({
  number: z
    .string()
    .trim()
    .min(1, "Unit No. is required")
    .max(20, "Cannot be more than 20 characters"),
  rentAmount: z.number().min(0, "Must be greater than 0"),
  dueDate: z.number().int("Must be a whole number").optional(),
  propertyId: z.string().min(1, "Property Id is required"),
});

export type UnitFormData = z.infer<typeof unitSchema>;

/*
 id         String @id
  number     String
  rentAmount Float  @default(0)
  dueDate    Int?
  propertyId String

  property Property @relation(fields: [propertyId], references: [id])
  tenant   Tenant?
*/
