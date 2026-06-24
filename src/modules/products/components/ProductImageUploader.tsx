"use client";

import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/webp",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;

type ProductImageUploadProps = {
  file: File | null;
  name: string;
  onChange: (file: File | null) => void;
  error?: string;
};

export default function ProductImageUpload({
  file,
  name,
  onChange,
  error,
}: ProductImageUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const validateFile = (nextFile: File) => {
    if (!ACCEPTED_IMAGE_TYPES.includes(nextFile.type)) {
      return "Please upload a PNG, JPG, JPEG, or WEBP image.";
    }

    if (nextFile.size > MAX_FILE_SIZE) {
      return "Image must be 5 MB or smaller.";
    }

    return null;
  };

  const handleFiles = (files: FileList | null) => {
    if (!files?.length) return;
    const nextFile = files[0];
    const errorMessage = validateFile(nextFile);
    setValidationMessage(errorMessage);

    if (!errorMessage) {
      onChange(nextFile);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    handleFiles(event.dataTransfer.files);
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <Label htmlFor={name}>Product Image</Label>
      <div
        role="button"
        tabIndex={0}
        onClick={openFileDialog}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openFileDialog();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={cn(
          "group rounded-3xl border border-dashed border-input/70 bg-background/80 p-6 text-center transition focus:outline-none focus:ring-2 focus:ring-ring/50 focus:ring-offset-2 focus:ring-offset-background hover:border-primary",
          dragActive && "border-primary/80 bg-primary/5",
        )}
      >
        <input
          ref={inputRef}
          id={name}
          name={name}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          className="hidden"
          onChange={(event) => handleFiles(event.target.files)}
        />
        {previewUrl ? (
          <div className="h-60 relative mx-auto max-w-sm overflow-hidden rounded-3xl border border-border bg-muted">
            <Image
              fill
              src={previewUrl}
              alt="Selected product preview"
              className="w-full object-cover"
            />
          </div>
        ) : (
          <div className="space-y-4 py-20 md:py-30">
            <div className="space-y-2">
              <p className="text-base font-medium">Drag & drop your image</p>
              <p className="text-sm text-muted-foreground">
                or click to browse files.
              </p>
            </div>
          </div>
        )}
        <div className="mt-6 text-xs text-muted-foreground">
          <p>PNG, JPG, JPEG, WEBP up to 5 MB.</p>
          <p>Image is required for submission.</p>
        </div>
      </div>
      {(validationMessage || error) && (
        <p className="text-sm text-destructive">{validationMessage || error}</p>
      )}
    </div>
  );
}
