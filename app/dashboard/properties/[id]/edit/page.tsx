import { getProperty } from "@/app/lib/actions-properties";
import { EditFormWrapper } from "@/app/ui/form-wrapper";
import { PropertyForm } from "@/app/ui/properties/property-form";
import { redirect } from "next/navigation";

const EditPropertyPage = async ({ params }: { params: { id: string } }) => {
  const property = await getProperty(params.id);

  if (!property) redirect("/dashboard/properties");

  return (
    <div className="h-full flex flex-col justify-center items-center gap-4">
      <h1 className="font-bold text-lg">Edit {property.name}</h1>
      <EditFormWrapper>
        <PropertyForm property={property} />
      </EditFormWrapper>
    </div>
  );
};

export default EditPropertyPage;
