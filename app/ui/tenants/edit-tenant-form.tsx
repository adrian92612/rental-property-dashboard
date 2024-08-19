"use client";

import { useActionState } from "react";
import { upsertTenant } from "@/app/lib/actions";
import { Tenant } from "@prisma/client";
import Link from "next/link";

interface Props {
  tenant: Tenant;
}

const formatDate = (date: Date) => date.toISOString().split("T")[0];

export const EditTenantForm = ({ tenant }: Props) => {
  const [state, action, isPending] = useActionState(upsertTenant, {
    id: tenant.id,
    firstName: tenant.firstName,
    lastName: tenant.lastName,
    email: tenant.email,
    phoneNumber: tenant.phoneNumber,
    leaseStart: formatDate(tenant.leaseStart),
    leaseEnd: formatDate(tenant.leaseEnd),
    unitId: tenant.unitId,
    error: "",
    success: "",
  });

  console.log(state);

  return (
    <div>
      {state.success ? (
        <div>
          <p>{state.success}</p>
          <Link href={`/dashboard/tenants/${tenant.id}`}>Go Back</Link>
        </div>
      ) : (
        <form action={action} className="flex flex-col">
          <input type="hidden" name="tenantId" defaultValue={state.id} />
          <input type="hidden" name="unitId" defaultValue={state.unitId} />

          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            required
            defaultValue={state.firstName}
          />

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

          <button type="submit">{isPending ? "Updating..." : "Update Tenant"}</button>

          {state.error && <span className="text-red-400">{state.error}</span>}
        </form>
      )}
    </div>
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
