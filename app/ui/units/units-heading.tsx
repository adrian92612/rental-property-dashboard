import { UnitWithPropertyTenantName } from "@/app/lib/actions-units";
import { SortConfig } from "./unit-list";

type UnitsHeadingsProps = {
  sortConfig: SortConfig;
  requestSort: (key: keyof UnitWithPropertyTenantName) => void;
};

export const UnitsHeadings = ({
  sortConfig,
  requestSort,
}: UnitsHeadingsProps) => {
  const getSortIndicator = (key: keyof UnitWithPropertyTenantName) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? " ↑" : " ↓";
    }
    return "";
  };

  return (
    <div className="flex items-center border-b-2 font-poppins font-bold">
      <button className="units-cell" onClick={() => requestSort("number")}>
        Unit No. {getSortIndicator("number")}
      </button>
      <button className="units-cell" onClick={() => requestSort("property")}>
        Property Name {getSortIndicator("property")}
      </button>
      <button
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
      </button>
    </div>
  );
};
