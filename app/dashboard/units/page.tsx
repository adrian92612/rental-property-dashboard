import { getPropertiesWithUnits } from "@/app/lib/actions";
import { UnitsPageClient } from "@/app/ui/units/units-page";

const UnitsPage = async () => {
  const properties = await getPropertiesWithUnits();
  return <UnitsPageClient properties={properties} />;
};

export default UnitsPage;
