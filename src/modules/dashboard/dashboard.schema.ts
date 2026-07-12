import z from "zod";

export const DashboardTabSchema = z.enum([
  "overview",
  "feedback",
  "collabs",
  "innovations",
]);

export type DashboardTabSchemaType = z.infer<typeof DashboardTabSchema>;
