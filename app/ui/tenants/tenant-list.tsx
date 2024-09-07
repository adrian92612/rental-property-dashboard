"use client";

import Link from "next/link";
import { useState } from "react";
import { Tenant } from "@prisma/client";
import { TenantsHeadings } from "./tenants-headings";
import { TenantCard } from "./tenant-card";

type TenantListProps = {
  tenants: Tenant[];
};

export type TenantSortConfig = {
  key: keyof Tenant | null;
  direction: "ascending" | "descending";
};

export const TenantList = ({ tenants }: TenantListProps) => {
  const [sortConfig, setSortConfig] = useState<TenantSortConfig>({
    key: null,
    direction: "ascending",
  });
  const sortedTenants = [...tenants].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key] ?? "";
      const bValue = b[sortConfig.key] ?? "";

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

  const requestSort = (key: keyof Tenant) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <ul>
      <li>
        <TenantsHeadings sortConfig={sortConfig} requestSort={requestSort} />
      </li>
      {tenants.length &&
        sortedTenants.map((tenant) => (
          <li key={tenant.id}>
            <Link href={`/dashboard/tenants/${tenant.id}`}>
              <TenantCard tenant={tenant} />
            </Link>
          </li>
        ))}
    </ul>
  );
};
