import { Control, Controller } from "react-hook-form";

import { FormField } from "@/components/ui/FormField";
import { BuilderProfileFormSchemaType } from "../builder-profile.schema";

type Props = {
  control: Control<BuilderProfileFormSchemaType>;
};

export default function BuilderProfileFormBasicSection({ control }: Props) {
  return (
    <div className="space-y-8">
      <Controller
        name="headline"
        control={control}
        render={({ field, fieldState }) => (
          <FormField
            label="Headline"
            name={field.name}
            id="headline"
            placeholder="Full-stack developer building products students actually use."
            required={false}
            value={field.value ?? ""}
            onChange={field.onChange}
            error={fieldState.error?.message}
            helperText="A short sentence that tells people what you do."
          />
        )}
      />

      <Controller
        name="bio"
        control={control}
        render={({ field, fieldState }) => (
          <FormField
            label="Bio"
            name={field.name}
            id="bio"
            placeholder="Tell other builders a little about yourself, your interests, or what you're currently working on."
            required={false}
            textarea
            value={field.value ?? ""}
            onChange={field.onChange}
            error={fieldState.error?.message}
            helperText="This appears on your public builder profile."
          />
        )}
      />

      <Controller
        name="course"
        control={control}
        render={({ field, fieldState }) => (
          <FormField
            label="Course"
            name={field.name}
            id="course"
            placeholder="Computer Science"
            required={false}
            value={field.value ?? ""}
            onChange={field.onChange}
            error={fieldState.error?.message}
            helperText="Optional. Helps other students find builders in similar fields."
          />
        )}
      />
    </div>
  );
}
