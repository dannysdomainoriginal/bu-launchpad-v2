import { z } from "zod";

export const createFeedbackSchema = z.object({
  productId: z.uuid(),
  message: z.string().min(3).max(500),
});

export type CreateFeedbackInput = z.infer<typeof createFeedbackSchema>;
