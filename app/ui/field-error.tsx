import { PropertyFormData } from "../lib/schemas/property-schema";

type FieldErrorProps = {
  error: Record<string, string[]>;
  label: keyof PropertyFormData;
};

export const FieldError = ({ error, label }: FieldErrorProps) => {
  if (!error || !error[label] || error[label].length === 0) return null;
  return (
    <span className="text-red-400 text-sm">* {error[label][0] || ""}</span>
  );
};
