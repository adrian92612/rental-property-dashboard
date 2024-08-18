import { getUnit } from "@/app/lib/actions";
import { DeleteBtn } from "@/app/ui/delete-button";
import Link from "next/link";
import { redirect } from "next/navigation";

const UnitDetailsPage = async ({ params }: { params: { id: string } }) => {
  const unit = await getUnit(params.id);

  if (!unit) redirect("/dashboard/units");
  return (
    <div>
      <h1>Unit Details</h1>
      <p>{JSON.stringify(unit)}</p>
      <div>
        <DeleteBtn id={unit.id} model="unit" />
        <Link href={`/dashboard/units/${unit.id}/edit`}>Edit</Link>
      </div>
    </div>
  );
};

export default UnitDetailsPage;
