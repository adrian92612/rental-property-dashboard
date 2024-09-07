import { Tenant } from "@prisma/client";

type UnitCardProps = {
  tenant: Tenant;
};

export const TenantCard = ({ tenant }: UnitCardProps) => {
  return (
    <div className="units-cell-container border-b border-cyan-900 hover:bg-cyan-900 hover:text-rose-400 hover:font-bold">
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
