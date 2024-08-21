import { getProperties, PropertyWithUnits } from "@/app/lib/actions-properties";
import { PropertiesPageClient } from "@/app/ui/properties/properties-page";

const PropertiesPage = async () => {
  const properties = (await getProperties(true)) as PropertyWithUnits[];
  const sortedProperties = properties.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
  );
  return <PropertiesPageClient properties={sortedProperties} />;
};

export default PropertiesPage;
