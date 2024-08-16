"use client";
import { upsertProperty } from "@/app/lib/actions";
import { Property } from "@prisma/client";
import Link from "next/link";
import { useActionState } from "react";

export const EditPropertyForm = ({ property }: { property: Property }) => {
  const { name, address, id } = property;
  const [state, action, isPending] = useActionState(upsertProperty, {
    name,
    address,
    error: "",
    success: "",
  });

  return (
    <div>
      {state.success ? (
        <div>
          <p>{state.success}</p>
          <Link href={`/dashboard/properties/${id}`}>Go back</Link>
        </div>
      ) : (
        <form action={action} className="flex flex-col w-[400px] border">
          <input type="hidden" name="propertyId" defaultValue={id} />

          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" defaultValue={state.name} />

          <label htmlFor="address">Address</label>
          <input type="text" name="address" id="address" defaultValue={state.address} />

          <div>
            <button type="submit" disabled={isPending}>
              Submit
            </button>
            <Link href={`/dashboard/properties/${id}`}>Cancel</Link>
          </div>
          {state.error && <p>{state.error}</p>}
        </form>
      )}
    </div>
  );
};
