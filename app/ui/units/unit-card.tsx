import { UnitWithPropertyTenantName } from "@/app/lib/actions-units";

type UnitCardProps = {
  unit: UnitWithPropertyTenantName;
};

export const UnitCard = ({ unit }: UnitCardProps) => {
  return (
    <div className="units-cell-container py-1 border-b border-cyan-900 hover:bg-cyan-900 hover:text-gray-50">
      <div className="units-cell">{unit.number}</div>
      <div className="units-cell">{unit.property?.name}</div>
      <div className="units-cell hidden xs:block">{unit.rentAmount}</div>
      <div className="units-cell hidden sm:block">{unit.dueDate}</div>
      <div className="units-cell">{unit.tenant ? "Occupied" : "Vacant"}</div>
    </div>
  );
};
