import { z } from "zod";

const optionalUrl = z.preprocess((value) => {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
}, z.url("Enter a valid URL").optional()).optional();

export const builderProfileFormSchema = z.object({
  headline: z
    .string()
    .max(120, "Headline is too long, max of 120 characters")
    .optional()
    .or(z.literal("")),
  bio: z
    .string()
    .max(1000, "Bio is too long, max of 1000 characters")
    .optional()
    .or(z.literal("")),
  course: z
    .string()
    .max(120, "Course name is too long, max of 120 characters")
    .optional()
    .or(z.literal("")),
  githubUrl: optionalUrl,
  linkedinUrl: optionalUrl,
  twitterUrl: optionalUrl,
  websiteUrl: optionalUrl,
});

export type BuilderProfileFormSchemaType = z.infer<
  typeof builderProfileFormSchema
>;
