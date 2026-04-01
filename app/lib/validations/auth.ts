import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(2, "Invalid first name"),
  lastName: z.string().min(2, "Invalid last name"),
  email: z
    .string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email"),
  phone: z
    .string()
    .regex(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, "Invalid phone number"),
    password: z.string().min(6, "password it too short").max(20, "password is too long")
});

export const signinSchema = z.object({
  email: z
    .string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email"),
  password: z
  .string()
  .min(6, "password it too short")
  .max(20, "password is too long")
})