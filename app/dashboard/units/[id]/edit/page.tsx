import { getTenants, getUnit, UnitWithTenant } from "@/app/lib/actions";
import { EditUnitForm } from "@/app/ui/units/edit-unit-form";
import { redirect } from "next/navigation";

const EditUnitPage = async ({ params }: { params: { id: string } }) => {
  const unit = (await getUnit(params.id)) as UnitWithTenant;
  const tenants = await getTenants();

  if (!unit) redirect("/dashboard/units");

  return (
    <div className="bg-slate-100 h-full flex flex-col items-center gap-4">
      <h1 className="font-bold text-lg mt-10">Edit {unit.number}</h1>
      <EditUnitForm unit={unit} tenants={tenants} />
    </div>
  );
};

export default EditUnitPage;
