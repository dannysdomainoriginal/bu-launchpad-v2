import { Control, Controller } from "react-hook-form";

import { FormField } from "@/components/ui/FormField";
import { BuilderProfileFormSchemaType } from "../builder-profile.schema";

type Props = {
  control: Control<BuilderProfileFormSchemaType>;
};

export default function BuilderProfileFormLinksSection({ control }: Props) {
  return (
    <div className="space-y-8">
      <Controller
        name="websiteUrl"
        control={control}
        render={({ field, fieldState }) => (
          <FormField
            label="Website"
            name={field.name}
            id="websiteUrl"
            placeholder="https://yourwebsite.com"
            required={false}
            value={field.value ?? ""}
            onChange={field.onChange}
            error={fieldState.error?.message}
            helperText="Your personal website or portfolio."
          />
        )}
      />

      <Controller
        name="githubUrl"
        control={control}
        render={({ field, fieldState }) => (
          <FormField
            label="GitHub"
            name={field.name}
            id="githubUrl"
            placeholder="https://github.com/username"
            required={false}
            value={field.value ?? ""}
            onChange={field.onChange}
            error={fieldState.error?.message}
            helperText="Share your GitHub profile."
          />
        )}
      />

      <Controller
        name="linkedinUrl"
        control={control}
        render={({ field, fieldState }) => (
          <FormField
            label="LinkedIn"
            name={field.name}
            id="linkedinUrl"
            placeholder="https://linkedin.com/in/username"
            required={false}
            value={field.value ?? ""}
            onChange={field.onChange}
            error={fieldState.error?.message}
            helperText="Help builders connect with you professionally."
          />
        )}
      />

      <Controller
        name="twitterUrl"
        control={control}
        render={({ field, fieldState }) => (
          <FormField
            label="X (Twitter)"
            name={field.name}
            id="twitterUrl"
            placeholder="https://x.com/username"
            required={false}
            value={field.value ?? ""}
            onChange={field.onChange}
            error={fieldState.error?.message}
            helperText="Optional. Share your X profile."
          />
        )}
      />
    </div>
  );
}
