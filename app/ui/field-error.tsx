import { PropertyFormData } from "../lib/schemas/property-schema";
import { TenantFormData } from "../lib/schemas/tenant-schema";
import { UnitFormData } from "../lib/schemas/unit-schema";

type FieldErrorProps = {
  error: Record<string, string[]>;
  label: keyof PropertyFormData | keyof UnitFormData | keyof TenantFormData;
};

export const FieldError = ({ error, label }: FieldErrorProps) => {
  if (!error || !error[label] || error[label].length === 0) return null;
  return (
    <span className="text-red-400 text-sm">* {error[label][0] || ""}</span>
  );
};
