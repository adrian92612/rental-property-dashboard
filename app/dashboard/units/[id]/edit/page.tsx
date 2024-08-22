import { getTenants } from "@/app/lib/actions-tenants";
import { getUnitWithTenant } from "@/app/lib/actions-units";
import { EditFormWrapper } from "@/app/ui/form-wrapper";
import { UnitForm } from "@/app/ui/units/unit-form";
import { redirect } from "next/navigation";

const EditUnitPage = async ({ params }: { params: { id: string } }) => {
  const unit = await getUnitWithTenant(params.id);
  const tenants = await getTenants();

  if (!unit) redirect("/dashboard/units");

  return (
    <div className="bg-slate-100 h-full flex flex-col items-center gap-4">
      <h1 className="font-bold text-lg mt-10">Edit {unit.number}</h1>
      <EditFormWrapper>
        <UnitForm properties={null} unit={unit || []} tenants={tenants} />
      </EditFormWrapper>
    </div>
  );
};

export default EditUnitPage;
