import { z } from "zod";

export const createCollaborationRequestSchema = z.object({
  productId: z.string().uuid(),
  message: z
    .string()
    .trim()
    .min(3)
    .max(500)
    .optional()
    .default("Interested in collaborating on this project."),
});

export type CreateCollaborationRequestInput = z.infer<
  typeof createCollaborationRequestSchema
>;
