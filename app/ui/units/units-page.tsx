"use client";

import { Property, Tenant } from "@prisma/client";
import { useState } from "react";
import Link from "next/link";
import { UnitForm } from "./unit-form";
import { UnitWithPropertyTenantName } from "@/app/lib/actions-units";
import { UnitCard } from "./unit-card";

interface UnitsPageClientProps {
  units: UnitWithPropertyTenantName[];
  tenants: Tenant[];
  properties: Property[];
}

const Headings = () => {
  return (
    <div className="flex items-center border-b-2 font-poppins font-bold sticky">
      <div className="units-cell">Unit No.</div>
      <div className="units-cell">Property Name</div>
      <div className="units-cell">Rent Amount</div>
      <div className="units-cell">Due Date</div>
      <div className="units-cell">Status</div>
    </div>
  );
};

export const UnitsPageClient = ({
  units,
  tenants,
  properties,
}: UnitsPageClientProps) => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm(!showForm);
  return (
    <div className="h-full flex ">
      <div className="grow p-5 flex flex-col overflow-y-auto scrollbar-thin relative">
        <h2 className="text-center font-poppins font-extrabold text-xl">
          Units
        </h2>
        <button onClick={toggleForm} className="">
          Add Unit
        </button>
        <Headings />
        {units.length &&
          units.map((unit) => (
            <Link key={unit.id} href={`/dashboard/units/${unit.id}`}>
              <UnitCard unit={unit} />
            </Link>
          ))}
      </div>
      {showForm && (
        <div className="w-[400px] p-6">
          <button onClick={toggleForm}>Close</button>
          {/* <UnitForm properties={properties} unit={null} tenants={null} /> */}
          <UnitForm properties={properties} tenants={tenants} />
        </div>
      )}
    </div>
  );
};
