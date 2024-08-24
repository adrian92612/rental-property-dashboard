import { getTenants } from "@/app/lib/actions-tenants";
import { getUnitWithPropertyTenantName } from "@/app/lib/actions-units";
import { EditFormWrapper } from "@/app/ui/form-wrapper";
import { UnitForm } from "@/app/ui/units/unit-form";
import { redirect } from "next/navigation";

const EditUnitPage = async ({ params }: { params: { id: string } }) => {
  const unit = await getUnitWithPropertyTenantName(params.id);
  const tenants = await getTenants();

  if (!unit) redirect("/dashboard/units");

  return (
    <div className="h-full flex flex-col justify-center items-center gap-4">
      <h1 className="font-bold text-lg">Edit {unit.number}</h1>
      <EditFormWrapper>
        <UnitForm unit={unit} tenants={tenants || []} />
      </EditFormWrapper>
    </div>
  );
};

export default EditUnitPage;
