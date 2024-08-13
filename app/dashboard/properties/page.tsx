import { getProperties, getUnits, getUserId } from "@/app/lib/actions";
import { PropertiesPageClient } from "@/app/ui/properties/properties-page";

const PropertiesPage = async () => {
  const userId = await getUserId();
  const properties = await getProperties(userId);
  console.log(properties);
  return <PropertiesPageClient properties={properties} />;
};

export default PropertiesPage;
