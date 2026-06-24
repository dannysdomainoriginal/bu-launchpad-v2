import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/webp",
] as const;

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const normalizeTags = (value: string) => {
  const normalized = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const seen = new Set<string>();
  return normalized.filter((tag) => {
    const lower = tag.toLowerCase();
    if (seen.has(lower)) {
      return false;
    }
    seen.add(lower);
    return true;
  });
};

export const createProductFormSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(250, "Product name is too long, max of 250 characters"),

  tagline: z
    .string()
    .min(1, "Product tagline is required")
    .max(250, "Product tagline is too long, max of 250 characters"),

  description: z
    .string()
    .min(1, "Description is required")
    .max(5000, "Description is too long, make it brief and concise"),

  liveUrl: z
    .preprocess((value) => {
      if (typeof value !== "string") return undefined;
      const trimmed = value.trim();
      return trimmed.length ? trimmed : undefined;
    }, z.url("Enter a valid URL").optional())
    .optional(),

  tags: z
    .array(z.string().min(1, "Tag cannot be blank"))
    .min(1, "Add at least one tag"),

  image: z
    .custom<File>((value) => value instanceof File, {
      message: "Image is required",
    })
    .refine(
      (file) =>
        file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type as any),
      "Supported formats: PNG, JPG, JPEG, WEBP",
    )
    .refine(
      (file) => file instanceof File && file.size <= MAX_IMAGE_SIZE,
      "Image must be 5 MB or smaller",
    ),
});

export const createProductServerParseSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(250, "Product name is too long, max of 250 characters"),

  tagline: z
    .string()
    .min(1, "Product tagline is required")
    .max(250, "Product tagline is too long, max of 250 characters"),

  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      slugPattern,
      "Slug must be lowercase, URL-safe, and may use hyphens only",
    ),

  description: z
    .string()
    .min(1, "Description is required")
    .max(5000, "Description is too long, make it brief and concise"),

  liveUrl: z
    .preprocess((value) => {
      if (typeof value !== "string") return undefined;

      let trimmed = value.trim();
      if (
        trimmed.length &&
        !trimmed.includes("https://") &&
        !trimmed.includes("http://")
      ) {
        trimmed = `https://${trimmed}`;
      }

      return trimmed.length ? trimmed : undefined;
    }, z.url("Enter a valid URL").optional())
    .optional(),

  tags: z
    .array(z.string().min(1, "Tag cannot be blank"))
    .min(1, "Add at least one tag"),

  image: z
    .custom<File>((value) => value instanceof File, {
      message: "Image is required",
    })
    .refine(
      (file) =>
        file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type as any),
      "Supported formats: PNG, JPG, JPEG, WEBP",
    )
    .refine(
      (file) => file instanceof File && file.size <= MAX_IMAGE_SIZE,
      "Image must be 5 MB or smaller",
    ),
});

export type CreateProductFormSchemaType = z.infer<
  typeof createProductFormSchema
>;
