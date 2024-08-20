"use client";

import { useActionState, useEffect, useState } from "react";
import { upsertTenant } from "@/app/lib/actions";

const formatDate = (date: Date) => date.toISOString().split("T")[0];

export const AddTenantForm = () => {
  const [state, action, isPending] = useActionState(upsertTenant, {});

  const [term, setTerm] = useState(1);
  const [termStart, setTermStart] = useState("");
  const [termEnd, setTermEnd] = useState("");

  useEffect(() => {
    if (state.success) {
      setTerm(1);
      setTermStart("");
      setTermEnd("");
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

  return (
    <form action={action} className="flex flex-col">
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
