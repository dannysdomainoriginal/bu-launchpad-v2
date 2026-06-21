"use client";

import React, { useActionState, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ProductFormField from "./ProductFormField";
import ProductImageUpload from "./ProductImageUploader";
import TagInput from "./TagInput";
import { Button } from "@/components/ui/button";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import { addProductAction } from "../actions";
import { createProductFormSchema, CreateProductFormSchemaType } from "../products.schema";

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

const initialState = {
  success: false,
  errors: {},
  message: "",
};

export default function ProductSubmitForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    addProductAction,
    initialState,
  );

  const { control, handleSubmit, reset, setValue, watch } =
    useForm<CreateProductFormSchemaType>({
      resolver: zodResolver(createProductFormSchema) as any,
      defaultValues: {
        name: "",
        slug: "",
        description: "",
        liveUrl: undefined,
        tags: [],
        image: undefined,
      },
      mode: "onBlur",
    });

  const nameValue = watch("name");

  useEffect(() => {
    setValue("slug", slugify(nameValue || ""), {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [nameValue, setValue]);

  useEffect(() => {
    if (state.success) {
      reset({
        name: "",
        slug: "",
        description: "",
        liveUrl: undefined,
        tags: [],
        image: undefined,
      });
    }
  }, [reset, state.success]);

  const onSubmit = async () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    await formAction(formData);
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
      noValidate
    >
      {state.message ? (
        <div
          className={
            state.success
              ? "rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-900"
              : "rounded-3xl border border-destructive-500/20 bg-destructive-500/10 p-4 text-sm text-destructive-900"
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
          <ProductFormField
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
        name="slug"
        control={control}
        render={({ field, fieldState }) => (
          <ProductFormField
            label="Slug"
            name={field.name}
            id="slug"
            placeholder="my-awesome-product"
            required
            value={field.value}
            readOnly
            helperText="Automatically generated from the product name"
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <ProductFormField
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
          <ProductFormField
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
          className="w-full rounded-none py-6"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2Icon className="size-4 animate-spin" />
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
