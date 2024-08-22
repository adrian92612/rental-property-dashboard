"use client";

import { useActionState, useEffect, useState } from "react";
import { Tenant } from "@prisma/client";
import { formatDate } from "@/app/lib/helpers";
import { Input, Label } from "../form-elements";
import { FormButtons } from "../form-buttons";
import { useRouter } from "next/navigation";
import { upsertTenant } from "@/app/lib/actions-tenants";

type TenantFormProps = {
  tenant: Tenant | null;
};

export const TenantForm = ({ tenant = null }: TenantFormProps) => {
  const [state, action, isPending] = useActionState(upsertTenant, {
    ...(tenant && {
      tenantId: tenant.id,
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
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      setTerm(1);
      setTermStart("");
      setTermEnd("");
      state.success = "";
    }
  }, [state]);

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

  const tenantUrl = `/dashboard/tenants/${tenant?.id}`;

  if (tenant && state.updateSuccess) {
    router.push(tenantUrl);
  }

  return (
    <form action={action} className="flex flex-col" inert={state.updateSuccess}>
      <input type="hidden" name="tenantId" defaultValue={state.id} />
      <input type="hidden" name="unitId" defaultValue={state.unitId} />

      <Label htmlFor="firstName">First Name</Label>
      <Input
        type="text"
        name="firstName"
        id="firstName"
        defaultValue={state.firstName}
      />

      <Label htmlFor="lastName">Last Name</Label>
      <Input
        type="text"
        name="lastName"
        id="lastName"
        defaultValue={state.lastName}
      />

      <Label htmlFor="email">Email</Label>
      <Input type="email" name="email" id="email" defaultValue={state.email} />

      <Label htmlFor="phoneNumber">Phone Number</Label>
      <Input
        type="tel"
        name="phoneNumber"
        id="phoneNumber"
        defaultValue={state.phoneNumber}
      />

      <Label htmlFor="termInMonths">Term in months</Label>
      <Input
        type="number"
        name="termInMonths"
        id="termInMonths"
        min={1}
        step={1}
        value={term}
        onChange={handleTermChange}
      />

      <Label htmlFor="leaseStart">Lease Start</Label>
      <Input
        type="date"
        name="leaseStart"
        id="leaseStart"
        required
        value={termStart}
        onChange={handleStartDateChange}
      />

      <Label htmlFor="leaseEnd">Lease End</Label>
      <Input
        type="date"
        name="leaseEnd"
        id="leaseEnd"
        readOnly
        value={termEnd}
      />

      <FormButtons
        isPending={isPending}
        isEditMode={!!tenant}
        cancelUrl={tenantUrl}
      />

      {state.error && <span className="text-red-400">{state.error}</span>}
      {state.success && <span className="text-green-400">{state.success}</span>}
      {state.updateSuccess && (
        <span className="text-green-700">{state.updateSuccess}</span>
      )}
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
