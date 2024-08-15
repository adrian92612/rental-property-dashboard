import { getPropertiesWithUnits } from "@/app/lib/actions";
import { PropertiesPageClient } from "@/app/ui/properties/properties-page";

const PropertiesPage = async () => {
  const properties = await getPropertiesWithUnits();
  return <PropertiesPageClient properties={properties} />;
};

export default PropertiesPage;
