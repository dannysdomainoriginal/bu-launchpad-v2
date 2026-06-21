"use server";

import { auth, currentUser } from "@clerk/nextjs/server";

import uploadService from "@/modules/upload/upload.service";
import { createProductServerParseSchema } from "../products.schema";
import { insertNewProduct } from "../products.service";

type FormState = {
  success: boolean;
  errors?: Record<string, string[] | undefined>;
  message: string;
};

export const addProductAction = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const authContext = await auth();
  const { userId, orgId } = authContext;

  if (!userId) {
    return {
      success: false,
      message: "You must be signed in to submit a product.",
    };
  }

  const user = await currentUser();
  if (!user) {
    return {
      success: false,
      message: "You must be signed in to submit a product.",
    };
  }

  const tagsValue = formData.get("tags");
  const imageValue = formData.get("image");

  const parsed = createProductServerParseSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    liveUrl: formData.get("liveUrl"),
    tags: typeof tagsValue === "string" ? tagsValue : "",
    image: imageValue,
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: "Please correct the highlighted fields.",
    };
  }

  const { tags, image, ...product } = parsed.data;

  const authorName =
    user.fullName ||
    `${user.firstName ? user.firstName + " " : ""}${user.lastName ?? ""}`.trim() ||
    user.username ||
    "Anonymous author";
  const authorAvatar = user.imageUrl || "/images/default-avatar.webp";

  const productId = crypto.randomUUID();
  const imageUrl = await uploadService.uploadImageFile({
    file: image,
    key: `${productId}-image.webp`,
  });

  try {
    await insertNewProduct(
      {
        ...product,
        id: productId,
        image: imageUrl.url,
        authorAvatar,
        authorName,
        authorId: userId,
        organizationId: orgId,
      },
      tags,
    );
  } catch (err: any) {
    // handle errors accordingly
    return {
      success: false,
      message: "There was an error submitting your product",
    };
  }

  return {
    success: true,
    message: "Your product has been submitted and is pending review.",
  };
};
