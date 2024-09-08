"use client";

import { UnitWithPropertyTenantName } from "@/app/lib/actions-units";
import { UnitsHeadings } from "./units-heading";
import Link from "next/link";
import { UnitCard } from "./unit-card";
import { useState } from "react";
import { DeleteEditBtn } from "../delete-edit-button";

type UnitListProps = {
  units: UnitWithPropertyTenantName[];
};

export type SortConfig = {
  key: keyof UnitWithPropertyTenantName | null;
  direction: "ascending" | "descending";
};

export const UnitList = ({ units }: UnitListProps) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "ascending",
  });
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
    <ul>
      <UnitsHeadings sortConfig={sortConfig} requestSort={requestSort} />
      {!!units.length &&
        sortedUnits.map((unit) => (
          <Link key={unit.id} href={`/dashboard/units/${unit.id}`}>
            <div className="flex items-center justify-end">
              <DeleteEditBtn id={unit.id} model={"unit"} />
            </div>
            <UnitCard unit={unit} />
          </Link>
        ))}
    </ul>
  );
};
