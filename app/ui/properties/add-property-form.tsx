"use client";

import { addProperty } from "@/app/lib/actions";
import { useActionState } from "react";

export const AddPropertyForm = () => {
  const [state, action, isPending] = useActionState(addProperty, {
    name: "",
    address: "",
    units: 1,
    error: "",
    success: "",
  });

  return (
    <form action={action} className="flex flex-col">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Prima Building"
        defaultValue={state.name}
      />

      <label htmlFor="address">Address</label>
      <input
        type="text"
        name="address"
        id="address"
        placeholder="123 some street some place, some city"
        defaultValue={state.address}
      />

      <label htmlFor="units">Number of Unit/s</label>
      <input type="number" name="units" id="units" min={1} step={1} defaultValue={state.units} />

      <button type="submit">Add Property</button>

      {state.error && <span className="text-red-400">{state.error}</span>}
      {state.succcess && <span className="text-green-400">{state.success}</span>}
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
