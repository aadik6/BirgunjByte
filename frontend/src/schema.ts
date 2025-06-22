import { z } from 'zod';

export const categorySchema = z.object({
    name: z.string().min(4, "Category name is required"),
    description: z.string().min(5, "Category description is requires")
});

export type CategoryFormValue = z.infer<typeof categorySchema>

export const newsSchema = z.object({
    heading: z.string().min(4, "News heading is required"),
    description: z.string().min(5, "News description is required"),
    isBreaking: z.boolean(),
    category: z.string().min(1, "Select a category"),
    isFeatured: z.boolean(),
    image:z.optional(z.string()),
    author:z.boolean(),
});

export type NewsFormValue = z.infer<typeof newsSchema>

export const userSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    userName: z.string().min(3, "Username is required"),
    email: z.string().email("Invalid email"),
    role: z.enum(["admin", "editor", "user"], {
      required_error: "Role is required",
    }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
    avatar: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UserForm = z.infer<typeof userSchema>;