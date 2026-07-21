"use server";

import { auth } from "@clerk/nextjs/server";
import {
  builderProfileFormSchema,
  BuilderProfileFormSchemaType,
} from "../builder-profile.schema";
import { upsertBuilderProfile } from "../builder-profile.service";

type FormState = {
  success: boolean;
  message: string;
};

export const saveProfileAction = async (
  data: BuilderProfileFormSchemaType,
): Promise<FormState> => {
  const { userId } = await auth();
  console.log(userId);

  if (!userId) {
    return {
      success: false,
      message: "You must be signed in to update your profile.",
    };
  }

  const parsed = builderProfileFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Your input did not pass server-side validation.",
    };
  }

  try {
    await upsertBuilderProfile(userId, parsed.data);
  } catch (error) {
    console.error("Failed to save builder profile:", error);

    return {
      success: false,
      message: "There was an error saving your profile.",
    };
  }

  return {
    success: true,
    message: "Your profile has been saved successfully.",
  };
};
