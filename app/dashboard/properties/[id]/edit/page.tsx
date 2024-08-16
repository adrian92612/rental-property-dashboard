import { getProperty } from "@/app/lib/actions";
import { EditPropertyForm } from "@/app/ui/properties/edit-property-form";
import { redirect } from "next/navigation";

const EditPropertyPage = async ({ params }: { params: { id: string } }) => {
  const property = await getProperty(params.id, false);

  if (!property) redirect("/dashboard/properties");

  return (
    <div className="bg-slate-100 h-full flex flex-col items-center gap-4">
      <h1 className="font-bold text-lg mt-10">{`Edit ${property.name}`}</h1>
      <EditPropertyForm property={property} />
    </div>
  );
};

export default EditPropertyPage;
