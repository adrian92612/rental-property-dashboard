"use client";

import { UnitWithTenant, upsertUnit } from "@/app/lib/actions";
import { Tenant } from "@prisma/client";
import Link from "next/link";
import { useActionState } from "react";

interface Props {
  unit: UnitWithTenant;
  tenants: Tenant[];
}

export const EditUnitForm = ({ unit, tenants }: Props) => {
  console.log(unit);
  const { id, propertyId, number, rentAmount, dueDate, tenant } = unit;
  const [state, action, isPending] = useActionState(upsertUnit, {
    id,
    propertyId,
    number,
    rentAmount,
    dueDate,
    tenantId: tenant?.id || "",
    error: "",
    success: "",
  });

  console.log(state);

  return (
    <div>
      {state.success ? (
        <div>
          <p>{state.success}</p>
          <Link href={`/dashboard/units/${id}`}>Go Back</Link>
        </div>
      ) : (
        <form action={action} className="flex flex-col">
          <input type="hidden" name="unitId" defaultValue={id} />
          <input type="hidden" name="propertyId" defaultValue={propertyId} />

          <label htmlFor="number">Unit No.</label>
          <input type="text" name="number" id="number" defaultValue={state.number} />

          <label htmlFor="rentAmount">Rent Amount</label>
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

          <div>
            <button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update Unit"}
            </button>
            <Link href={`/dashboard/units/${id}`}>Cancel</Link>
          </div>
          {state.error && <span>{state.error}</span>}
        </form>
      )}
    </div>
  );
};

/*
model Unit {
  id         String @id
  number     String
  rentAmount Float  @default(0)
  dueDate    Int?
  propertyId String

  property Property @relation(fields: [propertyId], references: [id])
  tenant   Tenant?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
*/
