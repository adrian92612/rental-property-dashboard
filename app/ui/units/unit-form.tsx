"use client";

import { Property, Tenant, Unit } from "@prisma/client";
import { useActionState } from "react";
import { FormButtons } from "../form-buttons";
import { useRouter } from "next/navigation";
import { Label, Input } from "../form-elements";
import {
  UnitWithPropertyTenantName,
  upsertUnit,
} from "@/app/lib/actions-units";
import { FieldError } from "../field-error";

type UnitFormProps = {
  unit?: UnitWithPropertyTenantName;
  tenants?: Tenant[];
  properties?: Property[];
};

export const UnitForm = ({ unit, tenants, properties }: UnitFormProps) => {
  const [state, action, isPending] = useActionState(upsertUnit, {
    ...(unit && {
      number: unit.number,
      rentAmount: unit.rentAmount,
      dueDate: unit.dueDate,
      tenantId: unit.tenant?.id ?? "",
    }),
  });

  const router = useRouter();
  const unitUrl = `/dashboard/units/${unit?.id}`;
  const updateSucces: boolean = !!state.success && !!unit;
  if (updateSucces) router.push(unitUrl);

  return (
    <form action={action} className="flex flex-col">
      {unit && (
        <>
          <input type="hidden" name="unitId" defaultValue={unit?.id} />
          <input
            type="hidden"
            name="propertyId"
            defaultValue={unit?.propertyId}
          />
        </>
      )}

      {properties && (
        <>
          <Label htmlFor="propertyId">Property</Label>
          <select
            name="propertyId"
            id="propertyId"
            defaultValue={state.propertyId ?? ""}
            disabled={updateSucces || isPending}
            className="input-custom"
          >
            <option value="" disabled className="bg-cyan-800">
              -- Select a Property --
            </option>
            {properties
              .sort((a, b) =>
                a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
              )
              .map((property) => (
                <option
                  key={property.id}
                  value={property.id}
                  className="bg-cyan-800"
                >
                  {property.name}
                </option>
              ))}
          </select>
          <FieldError error={state.fieldErrors} label="propertyId" />
        </>
      )}

      <Label htmlFor="number">Unit No.</Label>
      <Input
        type="text"
        name="number"
        id="number"
        defaultValue={state.number}
        disabled={updateSucces || isPending}
      />
      <FieldError error={state.fieldErrors} label="number" />

      <Label htmlFor="rentAmount">Monthly Rent</Label>
      <Input
        type="number"
        name="rentAmount"
        id="rentAmount"
        min={0}
        defaultValue={state.rentAmount ?? 0}
        disabled={updateSucces || isPending}
      />
      <FieldError error={state.fieldErrors} label="rentAmount" />

      <Label htmlFor="dueDate">Due Date</Label>
      <select
        name="dueDate"
        id="dueDate"
        required
        defaultValue={state.dueDate}
        disabled={updateSucces || isPending}
        className="input-custom"
      >
        <option value="" disabled className="bg-cyan-800">
          -- Select Due Date --
        </option>
        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
          <option key={day} value={day} className="bg-cyan-800">
            {day}
          </option>
        ))}
      </select>
      <FieldError error={state.fieldErrors} label="dueDate" />

      {tenants && (
        <>
          <Label htmlFor="tenantId">Select a Tenant</Label>
          <select
            name="tenantId"
            id="tenantId"
            defaultValue={state.tenantId}
            disabled={updateSucces || isPending}
            className="input-custom"
          >
            <option value="" className="bg-cyan-800">
              No Tenant
            </option>
            {tenants?.length &&
              tenants.map((tenant) => (
                <option
                  key={tenant.id}
                  value={tenant.id}
                  className="bg-cyan-800"
                >{`${tenant.firstName} ${tenant.lastName}`}</option>
              ))}
          </select>
          <FieldError error={state.fieldErrors} label="tenantId" />
        </>
      )}

      <FormButtons
        isPending={isPending || updateSucces}
        isEditMode={!!unit}
        cancelUrl={unitUrl}
      />

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
