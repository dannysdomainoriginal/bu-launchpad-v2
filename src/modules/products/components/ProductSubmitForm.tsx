"use client";

import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SparklesIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import ProductImageUpload from "./ProductImageUploader";
import TagInput from "./TagInput";

import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/button";
import { addProductAction } from "../actions";

import {
  createProductFormSchema,
  CreateProductFormSchemaType,
} from "../products.schema";

const slugify = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function ProductSubmitForm() {
  const [state, setState] = useState<{ success?: boolean; message?: string }>(
    {},
  );

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<CreateProductFormSchemaType>({
    resolver: zodResolver(createProductFormSchema) as any,
    defaultValues: {
      name: "",
      tagline: "",
      description: "",
      liveUrl: "",
      tags: [],
      image: undefined,
    },
    mode: "onBlur",
  });

  const nameValue = watch("name");
  const slugValue = slugify(nameValue);

  const router = useRouter();

  const onSubmit: SubmitHandler<CreateProductFormSchemaType> = async (data) => {
    try {
      const serverResponse = await addProductAction({
        ...data,
        slug: slugValue,
      });

      setState(serverResponse);

      if (!serverResponse.success) {
        toast.error(
          serverResponse.message ??
            "There was an error submitting your product",
        );

        return;
      }

      reset({
        name: "",
        description: "",
        liveUrl: undefined,
        tags: [],
        image: undefined,
      });

      router.push(`/success/${slugValue}`);
    } catch (err) {
      setState({
        success: false,
        message: "There was an error submitting your product",
      });

      toast.error("There was an error submitting your product");
    }
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

      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <FormField
            label="Product Name"
            name={field.name}
            id="name"
            placeholder="My Awesome Product"
            required
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="tagline"
        control={control}
        render={({ field, fieldState }) => (
          <FormField
            label="Tagline"
            name={field.name}
            id="tagline"
            placeholder="A brief, catchy description of your innovation"
            required
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      <FormField
        label="Slug"
        name="slug"
        id="slug"
        placeholder="my-awesome-product"
        required
        value={slugValue}
        readOnly
        helperText="Automatically generated from the product name"
      />

      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <FormField
            label="Description"
            name={field.name}
            id="description"
            placeholder="Tell us more about your innovation"
            required
            textarea
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="liveUrl"
        control={control}
        render={({ field, fieldState }) => (
          <FormField
            label="Live URL"
            name={field.name}
            id="liveUrl"
            placeholder="https://yourproduct.com"
            required={false}
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
            helperText="Optional. Add a live product URL if available."
          />
        )}
      />

      <Controller
        name="tags"
        control={control}
        render={({ field, fieldState }) => (
          <div className="space-y-3">
            <TagInput
              tags={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
            <input type="hidden" name="tags" value={field.value.join(",")} />
          </div>
        )}
      />

      <Controller
        name="image"
        control={control}
        render={({ field, fieldState }) => (
          <ProductImageUpload
            file={field.value ?? null}
            name={field.name}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      <div>
        <Button
          type="submit"
          size="lg"
          className="w-full rounded-none py-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Submitting...
            </>
          ) : (
            <>
              <SparklesIcon className="size-4" />
              Submit For Review
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-3">
          Your product will be reviewed to ensure it aligns with our community
          standards before approval.
        </p>
      </div>
    </form>
  );
}
