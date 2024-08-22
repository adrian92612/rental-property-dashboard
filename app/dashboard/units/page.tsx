import { getProperties, PropertyWithUnits } from "@/app/lib/actions-properties";
import { UnitsPageClient } from "@/app/ui/units/units-page";

const UnitsPage = async () => {
  const properties = (await getProperties(true)) as PropertyWithUnits[];
  return <UnitsPageClient properties={properties} />;
};

export default UnitsPage;
