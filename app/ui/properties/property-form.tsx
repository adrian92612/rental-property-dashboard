"use client";

import { Property } from "@prisma/client";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { FormButtons } from "../form-buttons";
import { upsertProperty } from "@/app/lib/actions-properties";
import { Input, Label } from "../form-elements";
import { FieldError } from "../field-error";

type Props = {
  property: Property | null;
};

export const PropertyForm = ({ property }: Props) => {
  const [state, action, isPending] = useActionState(upsertProperty, {
    ...(property && {
      name: property.name,
      address: property.address,
    }),
  });
  const router = useRouter();
  const propertyUrl = `/dashboard/properties/${property?.id}`;

  const updateSuccess: boolean = !!state.success && !!property;

  if (updateSuccess) router.push(propertyUrl);

  return (
    <form action={action} className="flex flex-col">
      {property && (
        <input type="hidden" name="propertyId" value={property.id} />
      )}

      <Label htmlFor="name">Name</Label>
      <Input
        type="text"
        name="name"
        id="name"
        placeholder="Prima Building"
        disabled={updateSuccess || isPending}
        defaultValue={state.name}
      />
      <FieldError error={state.fieldErrors} label="name" />

      <Label htmlFor="address">Address</Label>
      <Input
        type="text"
        name="address"
        id="address"
        placeholder="123 some street some place, some city"
        disabled={updateSuccess || isPending}
        defaultValue={state.address}
      />
      <FieldError error={state.fieldErrors} label={"address"} />

      {!property && (
        <>
          <Label htmlFor="units">Number of Unit/s</Label>
          <Input
            type="number"
            name="units"
            id="units"
            defaultValue={state.units ?? 1}
            disabled={updateSuccess || isPending}
          />
          <FieldError error={state.fieldErrors} label={"units"} />
        </>
      )}

      <FormButtons
        isPending={isPending || updateSuccess}
        isEditMode={!!property}
        cancelUrl={propertyUrl}
      />

      {state.error && <span className="text-red-400">{state.error}</span>}
      {state.success && <span className="text-green-400">{state.success}</span>}
    </form>
  );
};

/*
model Property {
  id      String @id
  name    String
  address String
  units   Unit[] // Relation to units

  user   User   @relation(fields: [userId], references: [id])
  userId String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
*/
