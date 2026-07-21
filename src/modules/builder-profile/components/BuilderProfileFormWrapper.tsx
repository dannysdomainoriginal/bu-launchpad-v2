import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { getBuilderProfile } from "../builder-profile.service";
import BuilderProfileForm from "./BuilderProfileForm";

export default async function BuilderProfileFormWrapper() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/dashboard");
  }

  const builderProfile = await getBuilderProfile(userId);

  return <BuilderProfileForm userId={userId} builder={builderProfile} />;
}
