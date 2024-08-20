"use client";

import { Tenant } from "@prisma/client";
import { useState } from "react";
import Link from "next/link";
import { TenantForm } from "./tenant-form";

interface Props {
  tenants: Tenant[];
}

export const TenantsPageClient = ({ tenants }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm(!showForm);
  return (
    <div className="flex h-full bg-slate-100">
      <div className="grow ">
        <h1>Tenant List</h1>
        <button onClick={toggleForm}>Add a Tenant</button>
        {tenants.length ? (
          tenants.map((tenant) => {
            const fullName = `${tenant.firstName} ${tenant.lastName}`;
            return (
              <div key={tenant.id}>
                <Link href={`/dashboard/tenants/${tenant.id}`}>{fullName}</Link>
                <div>{JSON.stringify(tenant)}</div>
              </div>
            );
          })
        ) : (
          <p>No Tenants yet...</p>
        )}
      </div>
      {showForm && (
        <div className="w-[400px] p-6">
          <button onClick={toggleForm}>Close</button>
          <TenantForm tenant={null} />
        </div>
      )}
    </div>
  );
};
