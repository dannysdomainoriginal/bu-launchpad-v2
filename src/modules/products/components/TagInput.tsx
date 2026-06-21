"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TagInputProps = {
  tags: string[];
  onChange: (nextTags: string[]) => void;
  error?: string;
};

const normalizeTag = (value: string) => value.trim().replace(/\s+/g, " ");

export default function TagInput({ tags, onChange, error }: TagInputProps) {
  const [pendingTag, setPendingTag] = useState("");

  const addTag = (value: string) => {
    const nextTag = normalizeTag(value);
    if (!nextTag) {
      setPendingTag("");
      return;
    }

    const exists = tags.some(
      (tag) => tag.toLowerCase() === nextTag.toLowerCase(),
    );

    if (exists) {
      setPendingTag("");
      return;
    }

    onChange([...tags, nextTag]);
    setPendingTag("");
  };

  const removeTag = (index: number) => {
    onChange(tags.filter((_, tagIndex) => tagIndex !== index));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(pendingTag);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor="tags-input">Tags</Label>
        <p className="text-xs text-muted-foreground">
          Add at least one tag for discovery.
        </p>
      </div>
      <div className="rounded-lg border border-input bg-background p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <button
              key={`${tag}-${index}`}
              type="button"
              className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-foreground transition hover:bg-border"
              onClick={() => removeTag(index)}
            >
              {tag} <span className="inline-block ml-1.5">×</span>
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Input
            id="tags-input"
            name="tags-input"
            value={pendingTag}
            placeholder="Press enter to add a tag"
            onChange={(event) => setPendingTag(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            type="button"
            size="sm"
            className="w-full sm:w-auto"
            onClick={() => addTag(pendingTag)}
          >
            Add tag
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Separate tags with Enter or comma. Tags are saved as a string array.
      </p>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
