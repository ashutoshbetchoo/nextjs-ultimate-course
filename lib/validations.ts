import { z } from "zod";

export const SignInSchema = z.object({
  email: z.email({ error: "Please provide a valid email address." }),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .max(100, "Password cannot exceed 100 characters long."),
});

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long.")
    .max(30, "Username cannot exceed 30 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers and underscore.",
    ),
  name: z
    .string()
    .min(1, "Name is required.")
    .max(50, "Name cannot exceed 30 characters.")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces."),
  email: z.email({ error: "Please provide a valid email address." }),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .max(100, "Password cannot exceed 100 characters long.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character.",
    ),
});
