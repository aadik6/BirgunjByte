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
});

export type NewsFormValue = z.infer<typeof newsSchema>