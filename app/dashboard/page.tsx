import { auth } from "@/auth";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { getPropertiesWithUnitsAndTenants } from "../lib/actions-properties";
import { UnitWithTenant } from "../lib/actions-units";

const OverviewPage = async () => {
  const session = await auth();
  console.log(session?.user);
  const properties = await getPropertiesWithUnitsAndTenants();
  const data: { propertyName: string; units: number; occupancy: number }[] = [];

  const getUnitOccupancy = (units: UnitWithTenant[]) => {
    return units.filter((unit) => unit.tenant !== null).length;
  };

  properties?.map((property) => {
    data.push({
      propertyName: property.name,
      units: property.units.length,
      occupancy: getUnitOccupancy(property.units),
    });
  });

  // console.log(data);

  return (
    <div>
      Overview Page
      {/* <div>
        <BarChart width={500} height={500} data={data}>
          <CartesianGrid />
          <XAxis dataKey={"propertyName"} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="units" stackId="a" fill="#8884d8" />
          <Bar dataKey="occupancy" stackId="a" fill="#82ca9d" />
        </BarChart>
      </div> */}
    </div>
  );
};

export default OverviewPage;
