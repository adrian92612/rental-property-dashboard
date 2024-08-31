import { z } from "zod";

export const tenantSchema = z
  .object({
    tenantId: z.string().trim().min(1, "Tenant Id is missing"),
    unitId: z.string().trim().optional(),
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().min(1, "Last name is required"),
    email: z.string().trim().email("Not a valid email address"),
    phoneNumber: z
      .string({
        required_error: "Phone number is required",
        invalid_type_error: "Phone number must be a string",
      })
      .regex(/^\d+$/, "Phone number must contain only numbers"),
    termInMonths: z
      .number({
        required_error: "Term is required",
        invalid_type_error: "Term must be a number",
      })
      .int("Must be a whole number")
      .gt(0, "Must be between 1-60")
      .lt(61, "Must be between 1-60"),
    leaseStart: z.date({
      required_error: "Lease start date is required",
      invalid_type_error: "Invalid date format",
    }),
    leaseEnd: z.date({
      required_error: "Lease end date is required",
      invalid_type_error: "Invalid date format",
    }),
  })
  .refine((data) => data.leaseEnd > data.leaseStart, {
    message: "Lease end date must be after lease start date",
    path: ["leaseEnd"],
  });

export type TenantFormData = z.infer<typeof tenantSchema>;
