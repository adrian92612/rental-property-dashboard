import { getPropertiesWithUnits } from "@/app/lib/actions-properties";
import { PropertiesPageClient } from "@/app/ui/properties/properties-page";

const PropertiesPage = async () => {
  const properties = await getPropertiesWithUnits();

  if (!properties) return <div></div>;

  const sortedProperties = properties.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
  );
  return <PropertiesPageClient properties={sortedProperties} />;
};

export default PropertiesPage;
