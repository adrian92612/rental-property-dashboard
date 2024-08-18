"use client";

import { upsertUnit } from "@/app/lib/actions";
import { Property, Unit } from "@prisma/client";
import { useActionState } from "react";

interface PropertyWithUnits extends Property {
  units: Unit[];
}

interface Props {
  properties: PropertyWithUnits[];
}

export const AddUnitForm = ({ properties }: Props) => {
  const [state, action, isPending] = useActionState(upsertUnit, {
    propertyId: "",
    number: "",
    rent: 0,
    dueDate: undefined,
    error: "",
    success: "",
  });

  console.log(state);
  return (
    <form action={action} className="flex flex-col">
      <label htmlFor="propertyId">Property</label>
      <select name="propertyId" id="propertyId" defaultValue={state.propertyId}>
        <option value="" disabled>
          -- Select a Property --
        </option>
        {properties.map((prop) => (
          <option key={prop.id} value={prop.id}>
            {prop.name}
          </option>
        ))}
      </select>

      <label htmlFor="number">Unit No.</label>
      <input type="text" name="number" id="number" defaultValue={state.number} />

      <label htmlFor="rent">Monthly Rent</label>
      <input type="number" name="rent" id="rent" min={0} defaultValue={state.rent} />

      <label htmlFor="dueDate">Due Date</label>
      <select name="dueDate" id="dueDate" required defaultValue={state.dueDate}>
        <option value="" disabled>
          -- Select Due Date --
        </option>
        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>

      <button type="submit">{isPending ? "Adding..." : "Add Unit"}</button>

      {state.error && <span className="text-red-400">{state.error}</span>}
      {state.success && <span className="text-green-400">{state.success}</span>}
    </form>
  );
};

/*
model Unit {
  id         String  @id
  number     String
  rentAmount Float
  isOccupied Boolean @default(false)
  propertyId String

  property Property @relation(fields: [propertyId], references: [id])
  tenant   Tenant?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
*/
