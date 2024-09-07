import { UnitWithPropertyTenantName } from "@/app/lib/actions-units";
import { SortConfig } from "./unit-list";

type UnitsHeadingsProps = {
  sortConfig: SortConfig;
  requestSort: (key: keyof UnitWithPropertyTenantName) => void;
  hideProperty?: boolean;
};

export const UnitsHeadings = ({
  sortConfig,
  requestSort,
  hideProperty = false,
}: UnitsHeadingsProps) => {
  const getSortIndicator = (key: keyof UnitWithPropertyTenantName) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? " ↑" : " ↓";
    }
    return "";
  };

  return (
    <div className="units-cell-container border-b-2 border-cyan-900 font-poppins font-bold">
      <button className="units-cell" onClick={() => requestSort("number")}>
        Unit No. {getSortIndicator("number")}
      </button>
      {!hideProperty && (
        <button className="units-cell" onClick={() => requestSort("property")}>
          Property {getSortIndicator("property")}
        </button>
      )}
      <button
        className="units-cell hidden xs:block"
        onClick={() => requestSort("rentAmount")}
      >
        Rent {getSortIndicator("rentAmount")}
      </button>
      <button
        className="units-cell hidden sm:block"
        onClick={() => requestSort("dueDate")}
      >
        Due Date {getSortIndicator("dueDate")}
      </button>
      <button className="units-cell" onClick={() => requestSort("tenant")}>
        Status {getSortIndicator("tenant")}
      </button>
    </div>
  );
};
