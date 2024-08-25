import { Tenant } from "@prisma/client";

type UnitCardProps = {
  tenant: Tenant;
};

export const TenantCard = ({ tenant }: UnitCardProps) => {
  return (
    <div className="flex items-center border-b border-blue-200 hover:bg-rose-200">
      <div className="units-cell">{tenant.firstName}</div>
      <div className="units-cell">{tenant.lastName}</div>
      <div className="units-cell hidden xs:block">{tenant.email}</div>
      <div className="units-cell hidden sm:block">{tenant.phoneNumber}</div>
      <div className="units-cell">
        {tenant.unitId ? "Assigned" : "Unassigned"}
      </div>
    </div>
  );
};
