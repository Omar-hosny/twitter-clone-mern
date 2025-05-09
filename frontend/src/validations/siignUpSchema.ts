import { z } from "zod";

const signUpSchemaObject = z
  .object({
    name: z.string().min(1, { message: "Name is required" }).max(50),
    username: z.string().min(1, { message: "Username is required" }).trim(),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" })
      .trim(),
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpSchema = z.infer<typeof signUpSchemaObject>;
export { type SignUpSchema, signUpSchemaObject };
