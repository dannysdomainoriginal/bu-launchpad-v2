import React, { ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type TextAreaChangeEvent = (e: ChangeEvent<HTMLTextAreaElement>) => void;
type InputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => void;

type Props = {
  label: string;
  name: string;
  id: string;
  placeholder: string;
  required: boolean;
  error?: string;
  value?: string; // specifically for liveUrl, which is optional
  onChange?: InputChangeEvent | TextAreaChangeEvent;
  helperText?: string;
  textarea?: boolean;
  readOnly?: boolean;
};

export default function ProductFormField({
  label,
  name,
  id,
  placeholder,
  required,
  error,
  helperText,
  textarea = false,
  onChange,
  value,
  readOnly = false,
}: Props) {
  return (
    <div className="space-y-3">
      <Label htmlFor={id}>{label}</Label>
      {textarea ? (
        <Textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          onChange={onChange as TextAreaChangeEvent}
          value={value}
          readOnly={readOnly}
          className="min-h-24 px-3 py-3 overflow-y-auto"
        />
      ) : (
        <Input
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          onChange={onChange as InputChangeEvent}
          value={value}
          readOnly={readOnly}
        />
      )}

      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
