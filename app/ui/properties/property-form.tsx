"use client";

import { upsertProperty } from "@/app/lib/actions";
import { Property } from "@prisma/client";
import Link from "next/link";
import { useActionState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useRouter } from "next/navigation";
import { FormButtons } from "../form-buttons";

interface Props {
  property: Property | null;
}

const inputClass =
  "mb-2 px-3 py-1 rounded bg-transparent border border-cyan-900 focus:ring-cyan-700 focus:ring focus:outline-none";

const labelClass = "font-poppins text-lg";

export const PropertyForm = ({ property }: Props) => {
  const [state, action, isPending] = useActionState(upsertProperty, {
    ...(property && {
      name: property.name,
      address: property.address,
    }),
  });
  const router = useRouter();
  const propertyUrl = `/dashboard/properties/${property?.id}`;

  if (state.updateSuccess) {
    router.push(propertyUrl);
  }

  return (
    <form action={action} className="flex flex-col" inert={state.updateSuccess}>
      {property && <input type="hidden" name="propertyId" value={property.id}></input>}

      <label htmlFor="name" className={labelClass}>
        Name
      </label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Prima Building"
        defaultValue={state.name}
        className={inputClass}
      />

      <label htmlFor="address" className={labelClass}>
        Address
      </label>
      <input
        type="text"
        name="address"
        id="address"
        placeholder="123 some street some place, some city"
        defaultValue={state.address}
        className={inputClass}
      />

      {!property && (
        <>
          <label htmlFor="units" className={labelClass}>
            Number of Unit/s
          </label>
          <input
            type="number"
            name="units"
            id="units"
            min={1}
            step={1}
            defaultValue={state.units ?? 1}
            className={inputClass}
          />
        </>
      )}

      <FormButtons isPending={isPending} isEditMode={!!property} cancelUrl={propertyUrl} />

      {state.error && <span className="text-red-700">{state.error}</span>}
      {state.success && <span className="text-green-700">{state.success}</span>}
      {state.updateSuccess && <span className="text-green-700">{state.updateSuccess}</span>}
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
