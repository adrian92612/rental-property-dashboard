import { UnitWithPropertyTenantName } from "@/app/lib/actions-units";
import { TenantSortConfig } from "@/app/ui/tenants/tenant-list";
import { Tenant } from "@prisma/client";

type UnitsHeadingsProps = {
  sortConfig: TenantSortConfig;
  requestSort: (key: keyof Tenant) => void;
};

export const TenantsHeadings = ({
  sortConfig,
  requestSort,
}: UnitsHeadingsProps) => {
  const getSortIndicator = (key: keyof Tenant) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? " ↑" : " ↓";
    }
    return "";
  };

  return (
    <div className="flex items-center border-b-2 border-b-cyan-800 font-poppins font-bold">
      <button className="units-cell" onClick={() => requestSort("firstName")}>
        First Name {getSortIndicator("firstName")}
      </button>
      <button className="units-cell" onClick={() => requestSort("lastName")}>
        Last Name {getSortIndicator("lastName")}
      </button>
      <button
        className="units-cell hidden xs:block"
        onClick={() => requestSort("email")}
      >
        Email {getSortIndicator("email")}
      </button>
      <button
        className="units-cell hidden sm:block"
        onClick={() => requestSort("phoneNumber")}
      >
        Contact No. {getSortIndicator("phoneNumber")}
      </button>
      <button className="units-cell" onClick={() => requestSort("unitId")}>
        Status {getSortIndicator("unitId")}
      </button>

      {/* <button
        className="units-cell-sm hidden sm:block"
        onClick={() => requestSort("rentAmount")}
      >
        Rent Amount {getSortIndicator("rentAmount")}
      </button>
      <button
        className="units-cell-sm hidden sm:block"
        onClick={() => requestSort("dueDate")}
      >
        Due Date {getSortIndicator("dueDate")}
      </button>
      <button className="units-cell-sm" onClick={() => requestSort("tenant")}>
        Status {getSortIndicator("tenant")}
      </button> */}
    </div>
  );
};
