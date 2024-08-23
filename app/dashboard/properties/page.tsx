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
    <div className="h-screen">
      <FormModal variant="mobile">
        <PropertyForm property={null} />
      </FormModal>
      <h1>Properties</h1>
      <FormModal variant="desktop">
        <PropertyForm property={null} />
      </FormModal>
      {properties.length && (
        <ul className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {sortedProperties.map((property) => (
            <li key={property.id}>
              <PropertyCard property={property} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PropertiesPage;
