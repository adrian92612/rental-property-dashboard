"use client";

import { useActionState, useEffect, useState } from "react";
import { upsertTenant } from "@/app/lib/actions";
import { Tenant } from "@prisma/client";
import Link from "next/link";
import { formatDate } from "@/app/lib/helpers";

interface Props {
  tenant: Tenant | null;
}

export const TenantForm = ({ tenant = null }: Props) => {
  const [state, action, isPending] = useActionState(upsertTenant, {
    ...(tenant && {
      id: tenant.id,
      firstName: tenant.firstName,
      lastName: tenant.lastName,
      email: tenant.email,
      phoneNumber: tenant.phoneNumber,
      termInMonths: tenant.termInMonths,
      leaseStart: formatDate(tenant.leaseStart),
      leaseEnd: formatDate(tenant.leaseEnd),
      unitId: tenant.unitId,
    }),
  });

  const [term, setTerm] = useState(tenant ? state.termInMonths : 1);
  const [termStart, setTermStart] = useState(tenant ? state.leaseStart : "");
  const [termEnd, setTermEnd] = useState(tenant ? state.leaseEnd : "");

  useEffect(() => {
    console.log(state.success);
    if (state.success) {
      console.log("use effect");
      setTerm(1);
      setTermStart("");
      setTermEnd("");
      state.success = "";
    }
  });

  const calculateTerm = (term: number, start: string) => {
    if (!term || !start) {
      setTermEnd("");
      return;
    }
    const startDate = new Date(start);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + term);

    // Adjust if the day of month changes due to month overflow
    if (endDate.getDate() !== startDate.getDate()) {
      endDate.setDate(0); // Set to the last day of the previous month
    }

    const formatted = formatDate(endDate);
    setTermEnd(formatted);
  };

  const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = parseInt(e.target.value);
    setTerm(newTerm);
    calculateTerm(newTerm, termStart);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTermStart = e.target.value;
    setTermStart(newTermStart);
    calculateTerm(term, newTermStart);
  };

  if (tenant && state.updateSuccess) {
    return (
      <div>
        <p>{state.updateSuccess}</p>
        <Link href={`/dashboard/tenants/${tenant.id}`}>Go Back</Link>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col">
      <input type="hidden" name="tenantId" defaultValue={state.id} />
      <input type="hidden" name="unitId" defaultValue={state.unitId} />

      <label htmlFor="firstName">First Name</label>
      <input type="text" name="firstName" id="firstName" defaultValue={state.firstName} />

      <label htmlFor="lastName">Last Name</label>
      <input type="text" name="lastName" id="lastName" defaultValue={state.lastName} />

      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" defaultValue={state.email} />

      <label htmlFor="phoneNumber">Phone Number</label>
      <input type="tel" name="phoneNumber" id="phoneNumber" defaultValue={state.phoneNumber} />

      <label htmlFor="termInMonths">Term in months</label>
      <input
        type="number"
        name="termInMonths"
        id="termInMonths"
        min={1}
        step={1}
        value={term}
        onChange={handleTermChange}
      />

      <label htmlFor="leaseStart">Lease Start</label>
      <input
        type="date"
        name="leaseStart"
        id="leaseStart"
        required
        value={termStart}
        onChange={handleStartDateChange}
      />

      <label htmlFor="leaseEnd">Lease End</label>
      <input type="date" name="leaseEnd" id="leaseEnd" readOnly value={termEnd} />

      <button type="submit">
        {isPending
          ? tenant
            ? "Updating..."
            : "Adding..."
          : tenant
          ? "Update Tenant"
          : "Add Tenant"}
      </button>

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
