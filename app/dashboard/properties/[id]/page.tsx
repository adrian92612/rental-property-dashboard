import { getProperty, PropertyWithUnits } from "@/app/lib/actions";
import { DeleteBtn } from "@/app/ui/delete-button";
import Link from "next/link";
import { redirect } from "next/navigation";

const PropertyDetailsPage = async ({ params }: { params: { id: string } }) => {
  const property = (await getProperty(params.id)) as PropertyWithUnits;
  console.log(property);

  if (!property) redirect("/dashboard/properties");

  return (
    <div>
      <h1>{property.name}</h1>
      <p>{property.address}</p>
      <p>{property.id}</p>
      <p>{property.units.length}</p>
      <p>{property.createdAt.toLocaleDateString()}</p>
      <p>{property.updatedAt.toLocaleDateString()}</p>
      <div>
        <DeleteBtn id={property.id} model="property" />
        <Link href={`/dashboard/properties/${property.id}/edit`}>Edit</Link>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
