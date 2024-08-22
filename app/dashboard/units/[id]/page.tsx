import { getUnitWithTenant } from "@/app/lib/actions-units";
import { DeleteEditBtn } from "@/app/ui/delete-edit-button";
import { redirect } from "next/navigation";

const UnitDetailsPage = async ({ params }: { params: { id: string } }) => {
  const unit = await getUnitWithTenant(params.id);

  if (!unit) redirect("/dashboard/units");
  return (
    <div>
      <h1>Unit Details</h1>
      <p>{JSON.stringify(unit)}</p>
      <DeleteEditBtn id={unit.id} model="unit" />
    </div>
  );
};

export default UnitDetailsPage;
