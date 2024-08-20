"use client";

import { upsertProperty } from "@/app/lib/actions";
import { Property } from "@prisma/client";
import Link from "next/link";
import { useActionState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";

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

  console.log(state.success);

  if (state.updateSuccess) {
    return (
      <div>
        <h2>{state.updateSuccess}</h2>
        <Link
          href={`/dashboard/properties/${property?.id}`}
          className="text-rose-400 hover:text-rose-500 hover:font-bold"
        >
          Go back
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col">
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

      <div className="flex gap-2 text-rose-400">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-1 hover:text-rose-500 hover:font-bold"
        >
          <IoIosCheckmarkCircle />
          {isPending ? (property ? "Updating..." : "Adding...") : property ? "Update" : "Add"}
        </button>
        {property && (
          <Link
            href={`/dashboard/properties/${property.id}`}
            className="hover:text-rose-500 hover:font-bold"
          >
            Cancel
          </Link>
        )}
      </div>

      {state.error && <span className="text-red-700">{state.error}</span>}
      {state.success && <span className="text-green-700">{state.success}</span>}
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
