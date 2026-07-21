import { createClerkClient } from "@clerk/nextjs/server";

export const staticClerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});
