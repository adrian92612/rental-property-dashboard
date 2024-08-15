import { deleteProperty, getProperty } from "@/app/lib/actions";
import { DeleteBtn } from "@/app/ui/properties/delete-button";
import Link from "next/link";

const PropertyDetailsPage = async ({ params }: { params: { id: string } }) => {
  const property = await getProperty(params.id);
  console.log(property);
  return (
    <div>
      {property ? (
        <div>
          <h1>{property.name}</h1>
          <p>{property.address}</p>
          <p>{property.id}</p>
          <p>{property.createdAt.toLocaleDateString()}</p>
          <p>{property.updatedAt.toLocaleDateString()}</p>
          <div>
            <DeleteBtn id={property.id} model="property" />
            <Link href={`/dashboard/properties/${property.id}/edit`}>Edit</Link>
          </div>
        </div>
      ) : (
        <p>Property not found...</p>
      )}
    </div>
  );
};

export default PropertyDetailsPage;
