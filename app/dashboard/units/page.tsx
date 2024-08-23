import { getProperties } from "@/app/lib/actions-properties";
import { getTenants } from "@/app/lib/actions-tenants";
import { getUnitWithPropertyTenantName } from "@/app/lib/actions-units";
import { UnitsPageClient } from "@/app/ui/units/units-page";

const UnitsPage = async () => {
  const [units, tenants, properties] = await Promise.all([
    getUnitWithPropertyTenantName(),
    getTenants(),
    getProperties(),
  ]);

  if (!units || !tenants || !properties) return <div></div>;

  // return (
  //   <UnitsPageClient units={units} tenants={tenants} properties={properties} />
  // );

  return <div></div>;
};

export default UnitsPage;
