"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  builderProfileFormSchema,
  BuilderProfileFormSchemaType,
} from "../builder-profile.schema";
import { saveProfileAction } from "../actions";

import BuilderProfileFormBasicSection from "./BuilderProfileFormBasicSection";
import BuilderProfileFormLinksSection from "./BuilderProfileFormLinksSection";
import BuilderProfileFormSubmitButton from "./BuilderProfileFormSubmitButton";

type Props = {
  userId: string;
  builder: {
    userId: string;
    headline: string | null;
    bio: string | null;
    course: string | null;
    githubUrl: string | null;
    linkedinUrl: string | null;
    twitterUrl: string | null;
    websiteUrl: string | null;
    clerkCreatedAt: Date;
    createdAt: Date;
    updatedAt: Date;
  } | null;
};

export default function BuilderProfileForm({ userId, builder }: Props) {
  const [state, setState] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const isEditing = !!builder;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<BuilderProfileFormSchemaType>({
    resolver: zodResolver(builderProfileFormSchema) as any,
    mode: "onBlur",
    defaultValues: {
      headline: builder?.headline ?? "",
      bio: builder?.bio ?? "",
      course: builder?.course ?? "",
      githubUrl: builder?.githubUrl ?? "",
      linkedinUrl: builder?.linkedinUrl ?? "",
      twitterUrl: builder?.twitterUrl ?? "",
      websiteUrl: builder?.websiteUrl ?? "",
    },
  });

  const onSubmit: SubmitHandler<BuilderProfileFormSchemaType> = async (
    data,
  ) => {
    const serverResponse = await saveProfileAction(data);

    setState(serverResponse);

    if (!serverResponse.success) {
      toast.error(serverResponse.message);
      return;
    }

    toast.success(serverResponse.message);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      {state.message ? (
        <div
          className={
            state.success
              ? "rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-500/80"
              : "rounded-3xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-500/80"
          }
          aria-live="polite"
        >
          {state.message}
        </div>
      ) : null}

      <BuilderProfileFormBasicSection control={control} />

      <BuilderProfileFormLinksSection control={control} />

      <BuilderProfileFormSubmitButton
        isSubmitting={isSubmitting}
        isEditing={isEditing}
      />
    </form>
  );
}
