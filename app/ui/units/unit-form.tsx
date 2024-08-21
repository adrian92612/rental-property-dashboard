"use client";

import { PropertyWithUnits, UnitWithTenant, upsertUnit } from "@/app/lib/actions";
import { Tenant } from "@prisma/client";
import { useActionState } from "react";
import { FormButtons } from "../form-buttons";
import { useRouter } from "next/navigation";

interface Props {
  properties: PropertyWithUnits[] | null;
  unit: UnitWithTenant | null;
  tenants: Tenant[] | null;
}

export const UnitForm = ({ properties, unit, tenants }: Props) => {
  const [state, action, isPending] = useActionState(upsertUnit, {
    ...(unit &&
      tenants && {
        number: unit.number,
        rentAmount: unit.rentAmount,
        dueDate: unit.dueDate,
        tenantId: unit.tenant?.id ?? "",
      }),
  });

  const router = useRouter();
  const unitUrl = `/dashboard/units/${unit?.id}`;

  if (state.updateSuccess) {
    router.push(unitUrl);
  }

  console.log(state);
  return (
    <form action={action} className="flex flex-col" inert={state.updateSuccess}>
      <input type="hidden" name="unitId" defaultValue={unit?.id} />
      <input type="hidden" name="propertyId" defaultValue={unit?.propertyId} />

      {properties && (
        <>
          <label htmlFor="propertyId">Property</label>
          <select name="propertyId" id="propertyId" defaultValue={state.propertyId ?? ""}>
            <option value="" disabled>
              -- Select a Property --
            </option>
            {properties.map((prop) => (
              <option key={prop.id} value={prop.id}>
                {prop.name}
              </option>
            ))}
          </select>
        </>
      )}

      <label htmlFor="number">Unit No.</label>
      <input type="text" name="number" id="number" defaultValue={state.number} />

      <label htmlFor="rentAmount">Monthly Rent</label>
      <input
        type="number"
        name="rentAmount"
        id="rentAmount"
        min={0}
        defaultValue={state.rentAmount}
      />

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

      {tenants && (
        <>
          <label htmlFor="tenantId">Select a Tenant</label>
          <select name="tenantId" id="tenantId" defaultValue={state.tenantId}>
            <option value="">No Tenant</option>
            {tenants.map((tenant) => (
              <option
                key={tenant.id}
                value={tenant.id}
              >{`${tenant.firstName} ${tenant.lastName}`}</option>
            ))}
          </select>
        </>
      )}

      <FormButtons isPending={isPending} isEditMode={!!unit} cancelUrl={unitUrl} />

      {state.error && <span className="text-red-400">{state.error}</span>}
      {state.success && <span className="text-green-400">{state.success}</span>}
      {state.updateSuccess && <span className="text-green-700">{state.updateSuccess}</span>}
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
