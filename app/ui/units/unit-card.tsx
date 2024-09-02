import { UnitWithPropertyTenantName } from "@/app/lib/actions-units";

type UnitCardProps = {
  unit: UnitWithPropertyTenantName;
  hideProperty?: boolean;
};

export const UnitCard = ({ unit, hideProperty }: UnitCardProps) => {
  return (
    <div className="flex items-center border-b-2 hover:bg-rose-200">
      <div className="units-cell">{unit.number}</div>
      {!hideProperty && <div className="units-cell">{unit.property?.name}</div>}
      <div className="units-cell hidden xs:block">{unit.rentAmount}</div>
      <div className="units-cell hidden sm:block">{unit.dueDate}</div>
      <div className="units-cell">{unit.tenant ? "Occupied" : "Vacant"}</div>
    </div>
  );
};
