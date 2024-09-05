import { z } from "zod";

export const userRegisterSchema = z
  .object({
    email: z.string().trim().email(),
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().min(1, "Last name is required"),
    password: z
      .string()
      .trim()
      .refine(
        (value) => {
          const hasLowercase = /[a-z]/.test(value);
          const hasUppercase = /[A-Z]/.test(value);
          const hasNumber = /[0-9]/.test(value);
          const hasSpecialChar = /[^A-Za-z0-9]/.test(value);
          const minCharCount = value.length > 0;

          if (
            !hasLowercase ||
            !hasUppercase ||
            !hasNumber ||
            !hasSpecialChar ||
            !minCharCount
          ) {
            return false;
          }
          return true;
        },
        {
          message:
            "Password must be at least 6 characters; have at least 1 lowercase, 1 uppercase, 1 number, and 1 special character.",
        }
      ),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

export type UserRegisterFormData = z.infer<typeof userRegisterSchema>;
