import { z } from "zod";

export const pathologySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[a-zA-Z\s]*$/, "Only text is allowed"),
  age: z
    .string()
    .min(1, "Age is required")
    .max(2, "Age must be between 1 and 2 digits"),
  gender: z.string().min(1, "Gender is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be exactly 10 digits")
    .regex(/^\d+$/, "Phone number must be numeric"),
  patient_id: z.string().optional(),
  test_date: z.string().min(1, "Test date is required"),
  test_name: z.string().min(1, "Test name is required"),
  collected_by: z.string().min(1, "Collector name is required"),
  collection_date: z.string().min(1, "Collection date & time is required"),
  report_date: z.string().min(1, "Report date is required"),
});
export const signupSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[a-zA-Z\s]*$/, "Only text is allowed"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .min(1, "Password is required"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
});

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});
