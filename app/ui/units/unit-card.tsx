import { UnitWithPropertyTenantName } from "@/app/lib/actions-units";

type UnitCardProps = {
  unit: UnitWithPropertyTenantName;
};

export const UnitCard = ({ unit }: UnitCardProps) => {
  return (
    <div className="flex items-center border-b-2 hover:bg-rose-200">
      <div className="units-cell">{unit.number}</div>
      <div className="units-cell">{unit.property?.name}</div>
      <div className="units-cell-sm">{unit.rentAmount}</div>
      <div className="units-cell-sm">{unit.dueDate}</div>
      <div className="units-cell-sm">{unit.tenant ? "Occupied" : "Vacant"}</div>
    </div>
  );
};
