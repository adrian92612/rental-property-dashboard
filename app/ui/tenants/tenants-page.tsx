"use client";

import { Tenant } from "@prisma/client";
import { useState } from "react";
import { AddTenantForm } from "./add-tenant-form";

interface Props {
  tenants: Tenant[];
}

export const TenantsPageClient = ({ tenants }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm(!showForm);
  return (
    <div className="flex h-full bg-slate-100">
      <div className="grow">
        <h1>Tenant List</h1>
        <button onClick={toggleForm}>Add a Tenant</button>
        {tenants.length ? (
          tenants.map((tenant) => {
            const fullName = `${tenant.firstName} ${tenant.lastName}`;
            return <p key={tenant.id}>{fullName}</p>;
          })
        ) : (
          <p>No Tenants yet...</p>
        )}
      </div>
      {showForm && (
        <div className="w-[400px] p-6">
          <button onClick={toggleForm}>Close</button>
          <AddTenantForm />
        </div>
      )}
    </div>
  );
};
