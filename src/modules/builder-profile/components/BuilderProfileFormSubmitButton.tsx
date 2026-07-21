import { LoaderCircleIcon, SaveIcon, UserRoundPlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  isSubmitting: boolean;
  isEditing: boolean;
};

export default function BuilderProfileFormSubmitButton({
  isSubmitting,
  isEditing,
}: Props) {
  return (
    <div>
      <Button
        type="submit"
        size="lg"
        className="w-full rounded-none py-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <LoaderCircleIcon className="size-4 animate-spin" />
            {isEditing ? "Saving Changes..." : "Creating Profile..."}
          </>
        ) : (
          <>
            {isEditing ? (
              <>
                <SaveIcon className="size-4" />
                Save Changes
              </>
            ) : (
              <>
                <UserRoundPlusIcon className="size-4" />
                Create Profile
              </>
            )}
          </>
        )}
      </Button>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Your profile helps founders discover you.
      </p>
    </div>
  );
}
