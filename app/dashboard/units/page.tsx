import { getProperties } from "@/app/lib/actions-properties";
import { getTenants } from "@/app/lib/actions-tenants";
import { getUnitsWithPropertyTenantName } from "@/app/lib/actions-units";
import { FormModal } from "@/app/ui/form-modal";
import { UnitForm } from "@/app/ui/units/unit-form";
import { UnitList } from "@/app/ui/units/unit-list";

const UnitsPage = async () => {
  const [units, tenants, properties] = await Promise.all([
    getUnitsWithPropertyTenantName(),
    getTenants(),
    getProperties(),
  ]);

  if (!units || !tenants || !properties) return <div></div>;

  return (
    <>
      <FormModal label="Unit">
        <UnitForm properties={properties} tenants={tenants} />
      </FormModal>
      <div className="min-h-[95%] p-2 sm:border-l-2 border-cyan-900">
        <h1 className="font-poppins font-bold text-xl text-center w-fit mx-auto px-4 border-b border-cyan-900">
          Unit List
        </h1>
        <UnitList units={units || []} />
      </div>
    </>
  );
};

export default UnitsPage;
