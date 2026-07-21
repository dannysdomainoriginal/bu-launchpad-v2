import { db } from "@/lib/db";
import { builderProfiles, BuilderProfile } from "@/lib/db/schema";
import { staticClerkClient } from "@/lib/clerk-client";
import { cacheTag, cacheLife, revalidateTag, refresh } from "next/cache";
import { getProductsByUserId } from "@/modules/products/products.service";

/* -------------------------------------------------------------------------- */
/*                            GET BUILDER PROFILE                             */
/* -------------------------------------------------------------------------- */
export async function getBuilderProfile(userId: string): Promise<BuilderProfile | null> {
  "use cache";
  cacheTag(`builder-profile:by-user-id:${userId}`);

  const profile = await db.query.builderProfiles.findFirst({
    where: (builderProfiles, { eq }) => eq(builderProfiles.userId, userId),
  });

  return profile || null;
}

/* -------------------------------------------------------------------------- */
/*                          GET CACHED CLERK USER                             */
/* -------------------------------------------------------------------------- */
export async function getCachedClerkUser(userId: string) {
  "use cache";
  cacheLife("days");
  
  const user = await staticClerkClient.users.getUser(userId);

  const name =
    user.fullName ||
    `${user.firstName ? user.firstName + " " : ""}${user.lastName ?? ""}`.trim() ||
    user.username ||
    "Anonymous builder";
  const avatar = user.imageUrl || "/images/default-avatar.webp";
  const clerkCreatedAt = new Date(user.createdAt);

  return {
    name,
    avatar,
    clerkCreatedAt,
  };
}

/* -------------------------------------------------------------------------- */
/*                         GET BUILDER PROFILE PAGE                           */
/* -------------------------------------------------------------------------- */
export async function getBuilderPageData(userId: string) {
  // Composes smaller cached services
  const [builder, profile, products] = await Promise.all([
    getCachedClerkUser(userId).catch(() => null),
    getBuilderProfile(userId),
    getProductsByUserId(userId, {}),
  ]);

  if (!builder) {
    return null
  }

  const innovations = products.length;
  const totalVotes = products.reduce((sum, p) => sum + p.voteCount, 0);
  const memberSince = profile ? profile.clerkCreatedAt : builder.clerkCreatedAt;

  return {
    builder,
    profile,
    products,
    stats: {
      innovations,
      totalVotes,
      memberSince,
    },
  };
}

/* -------------------------------------------------------------------------- */
/*                        UPSERT BUILDER PROFILE                              */
/* -------------------------------------------------------------------------- */
export async function upsertBuilderProfile(
  userId: string,
  data: {
    headline?: string | null;
    bio?: string | null;
    course?: string | null;
    githubUrl?: string | null;
    linkedinUrl?: string | null;
    twitterUrl?: string | null;
    websiteUrl?: string | null;
  },
) {
  // 1. Fetch Clerk user only when necessary
  // Check if profile exists to determine if we need to fetch clerkCreatedAt
  const existing = await db.query.builderProfiles.findFirst({
    where: (builderProfiles, { eq }) => eq(builderProfiles.userId, userId),
    columns: {
      clerkCreatedAt: true,
    },
  });

  let clerkCreatedAt: Date;
  if (!existing) {
    const clerkUser = await getCachedClerkUser(userId);
    clerkCreatedAt = clerkUser.clerkCreatedAt;
  } else {
    clerkCreatedAt = existing.clerkCreatedAt;
  }

  // 2. Perform upsert
  await db
    .insert(builderProfiles)
    .values({
      userId,
      headline: data.headline || null,
      bio: data.bio || null,
      course: data.course || null,
      githubUrl: data.githubUrl || null,
      linkedinUrl: data.linkedinUrl || null,
      twitterUrl: data.twitterUrl || null,
      websiteUrl: data.websiteUrl || null,
      clerkCreatedAt,
    })
    .onConflictDoUpdate({
      target: builderProfiles.userId,
      set: {
        headline: data.headline || null,
        bio: data.bio || null,
        course: data.course || null,
        githubUrl: data.githubUrl || null,
        linkedinUrl: data.linkedinUrl || null,
        twitterUrl: data.twitterUrl || null,
        websiteUrl: data.websiteUrl || null,
      },
    });

  // 3. Invalidate tags depending on builder profile data
  revalidateTag(`builder-profile:by-user-id:${userId}`, "max");
  refresh();
}
