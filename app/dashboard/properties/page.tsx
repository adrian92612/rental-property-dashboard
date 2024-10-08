import { getPropertiesWithUnits } from "@/app/lib/actions-properties";
import { FormModal } from "@/app/ui/form-modal";
import { PropertyCard } from "@/app/ui/properties/property-card";
import { PropertyForm } from "@/app/ui/properties/property-form";

const PropertiesPage = async () => {
  const properties = await getPropertiesWithUnits();

  if (!properties) return <div></div>;

  const sortedProperties = properties.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
  );
  return (
    <>
      <FormModal label={"Property"}>
        <PropertyForm property={null} />
      </FormModal>
      <h1>Properties</h1>
      {!!properties.length && (
        <ul className="flex flex-wrap gap-4 justify-center sm:justify-start">
          {sortedProperties.map((property) => (
            <li key={property.id}>
              <PropertyCard property={property} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default PropertiesPage;
