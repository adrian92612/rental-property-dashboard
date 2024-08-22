"use client";

import { Property, Tenant } from "@prisma/client";
import { useState } from "react";
import Link from "next/link";
import { UnitForm } from "./unit-form";
import { UnitWithPropertyTenantName } from "@/app/lib/actions-units";
import { UnitCard } from "./unit-card";
import { ToggleFormButton } from "../toggle-form-button";
import { IoKey } from "react-icons/io5";
import { UnitsHeadings } from "./units-heading";

type UnitsPageClientProps = {
  units: UnitWithPropertyTenantName[];
  tenants: Tenant[];
  properties: Property[];
};

export type SortConfig = {
  key: keyof UnitWithPropertyTenantName | null;
  direction: "ascending" | "descending";
};

export const UnitsPageClient = ({
  units,
  tenants,
  properties,
}: UnitsPageClientProps) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "ascending",
  });
  const toggleForm = () => setShowForm(!showForm);

  const sortedUnits = [...units].sort((a, b) => {
    if (sortConfig.key) {
      let aValue, bValue;
      if (sortConfig.key === "property") {
        aValue = a[sortConfig.key]?.name ?? "";
        bValue = b[sortConfig.key]?.name ?? "";
      } else {
        aValue = a[sortConfig.key] ?? "";
        bValue = b[sortConfig.key] ?? "";
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "ascending"
          ? aValue.localeCompare(bValue, undefined, { sensitivity: "base" })
          : bValue.localeCompare(aValue, undefined, { sensitivity: "base" });
      }

      return (
        (aValue < bValue ? -1 : 1) *
        (sortConfig.direction === "ascending" ? 1 : -1)
      );
    }
    return 0;
  });

  const requestSort = (key: keyof UnitWithPropertyTenantName) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="h-full flex ">
      <div className="grow p-5 flex flex-col overflow-y-auto scrollbar-thin relative">
        <h2 className="text-center font-poppins font-extrabold text-xl">
          Units
        </h2>
        <ToggleFormButton fn={toggleForm} icon={<IoKey />} label="Add Unit" />
        <UnitsHeadings sortConfig={sortConfig} requestSort={requestSort} />
        {units.length &&
          sortedUnits.map((unit) => (
            <Link key={unit.id} href={`/dashboard/units/${unit.id}`}>
              <UnitCard unit={unit} />
            </Link>
          ))}
      </div>
      {showForm && (
        <div className="w-[400px] p-6">
          <button onClick={toggleForm}>Close</button>
          <UnitForm properties={properties} tenants={tenants} />
        </div>
      )}
    </div>
  );
};
