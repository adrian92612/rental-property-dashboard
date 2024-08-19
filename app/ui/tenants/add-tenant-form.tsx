"use client";

import { useActionState } from "react";
import { upsertTenant } from "@/app/lib/actions";

export const AddTenantForm = () => {
  const [state, action, isPending] = useActionState(upsertTenant, {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    leaseStart: "",
    leaseEnd: "",
    unitId: "",
    error: "",
    success: "",
  });

  return (
    <form action={action} className="flex flex-col">
      <label htmlFor="firstName">First Name</label>
      <input type="text" name="firstName" id="firstName" required defaultValue={state.firstName} />

      <label htmlFor="lastName">Last Name</label>
      <input type="text" name="lastName" id="lastName" required defaultValue={state.lastName} />

      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" required defaultValue={state.email} />

      <label htmlFor="phoneNumber">Phone Number</label>
      <input
        type="tel"
        name="phoneNumber"
        id="phoneNumber"
        required
        defaultValue={state.phoneNumber}
      />

      <label htmlFor="leaseStart">Lease Start</label>
      <input
        type="date"
        name="leaseStart"
        id="leaseStart"
        required
        defaultValue={state.leaseStart}
      />

      <label htmlFor="leaseEnd">Lease End</label>
      <input type="date" name="leaseEnd" id="leaseEnd" required defaultValue={state.leaseEnd} />

      <button type="submit">{isPending ? "Adding..." : "Add Tenant"}</button>

      {state.error && <span className="text-red-400">{state.error}</span>}
      {state.success && <span className="text-green-400">{state.success}</span>}
    </form>
  );
};

/*
model Tenant {
  id          String   @id
  firstName   String
  lastName    String
  email       String   @unique
  phoneNumber String
  leaseStart  DateTime
  leaseEnd    DateTime

  Unit   Unit?  @relation(fields: [unitId], references: [id])
  unitId String @unique

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
*/
