import { getProperties } from "@/app/lib/actions-properties";
import { getTenants } from "@/app/lib/actions-tenants";
import { getUnitWithPropertyTenantName } from "@/app/lib/actions-units";
import { FormModal } from "@/app/ui/form-modal";
import { UnitForm } from "@/app/ui/units/unit-form";
import { UnitList } from "@/app/ui/units/unit-list";

const UnitsPage = async () => {
  const [units, tenants, properties] = await Promise.all([
    getUnitWithPropertyTenantName(),
    getTenants(),
    getProperties(),
  ]);

  if (!units || !tenants || !properties) return <div></div>;

  return (
    <>
      <FormModal label="Unit">
        <UnitForm properties={properties} tenants={tenants} />
      </FormModal>
      <div className="h-screen pt-2">
        <h1 className="font-poppins font-bold text-lg text-center">
          Unit List
        </h1>
        <UnitList units={units} />
      </div>
    </>
  );
};

export default UnitsPage;
