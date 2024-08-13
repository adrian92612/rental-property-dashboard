import { getProperties, getUserId } from "@/app/lib/actions";
import { PropertiesPageClient } from "@/app/ui/properties/properties-page";

const PropertiesPage = async () => {
  const userId = await getUserId();
  const properties = await getProperties(userId);
  return <PropertiesPageClient properties={properties} />;
};

export default PropertiesPage;
