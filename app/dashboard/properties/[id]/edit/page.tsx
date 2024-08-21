import { getProperty } from "@/app/lib/actions";
import { PropertyForm } from "@/app/ui/properties/property-form";
import { redirect } from "next/navigation";

const EditPropertyPage = async ({ params }: { params: { id: string } }) => {
  const property = await getProperty(params.id, false);

  if (!property) redirect("/dashboard/properties");

  return (
    <div className="h-full flex flex-col items-center gap-4">
      <h1 className="font-bold text-lg mt-10">{`Edit ${property.name}`}</h1>
      <div className="w-[400px] border-cyan-900 border-2 p-4 rounded-lg">
        <PropertyForm property={property} />
      </div>
    </div>
  );
};

export default EditPropertyPage;
