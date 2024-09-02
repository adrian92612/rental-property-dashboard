import { getUser } from "@/app/lib/actions";
import {
  getPropertyWithUnitsAndTenants,
  PropertyWithUnitsAndTenant,
} from "@/app/lib/actions-properties";
import { formatDate } from "@/app/lib/helpers";
import { DeleteEditBtn } from "@/app/ui/delete-edit-button";
import { redirect } from "next/navigation";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { UnitWithTenant } from "@/app/lib/actions-units";
import { UnitList } from "@/app/ui/properties/property-unit-list";

const BasicInfo = ({ property }: { property: PropertyWithUnitsAndTenant }) => {
  const { name, address, image, createdAt, updatedAt } = property;
  return (
    <section className="max-w-[600px] flex-auto h-fit p-4 bg-gray-100 shadow-lg shadow-slate-400 rounded-md text-cyan-950">
      <h2 className="font-bold font-poppins text-lg border-b border-cyan-900 px-1 w-full text-center">
        Basic Information
      </h2>
      <div className="pt-2 xs:flex gap-2">
        <div className="relative w-[280px] h-[225px] flex justify-center items-center overflow-hidden ">
          <Image
            src={image ? image : ""}
            alt={"image of property"}
            quality={50}
            priority={true}
            style={{ objectFit: "contain" }}
            fill={true}
          />
        </div>
        <div className="flex flex-col border-l border-cyan-900 pl-2">
          <h2 className="font-poppins font-bold text-xl ">{name}</h2>
          <p className="flex items-center gap-2 ">
            <FaLocationDot /> {address}
          </p>
          <p className="mt-auto">
            <strong>Owner:</strong> owner
          </p>
          <p>
            <strong>Contact Info:</strong> email
          </p>
          <p>
            <strong>Created At:</strong> {formatDate(createdAt)}
          </p>
          <p>
            <strong>Last Updated At:</strong> {formatDate(updatedAt)}
          </p>
          <DeleteEditBtn id={property.id} model="property" />
        </div>
      </div>
    </section>
  );
};

const UnitsInfo = ({ units }: { units: UnitWithTenant[] }) => {
  return (
    <section className="flex-auto p-4 min-w-[250px] max-w-[400px] h-fit bg-gray-100 shadow-lg shadow-slate-400 rounded-md text-cyan-950">
      <div>
        <h2 className="font-poppins font-bold text-lg border-b border-cyan-900 text-center mb-2">
          Units Information
        </h2>
        <p>
          <strong>No. of Units:</strong> {units.length}
        </p>
        <p>
          <strong>Total Monthly Rent:</strong>
        </p>
        <p>
          <strong>Average Rent per Unit:</strong>
        </p>
        <p>
          <strong>Outstanding Payments:</strong>
        </p>
      </div>
    </section>
  );
};

const PropertyDetailsPage = async ({ params }: { params: { id: string } }) => {
  const [user, property] = await Promise.all([
    await getUser(),
    await getPropertyWithUnitsAndTenants(params.id),
  ]);

  if (!property || !user) redirect("/dashboard/properties");

  // const { name, address, units, createdAt, updatedAt } = property;

  return (
    <div className="flex flex-col items-center justify-around gap-6 py-4 overflow-y-auto h-full scrollbar-thin">
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 w-full sm:items-center sm:justify-evenly">
        <BasicInfo property={property} />
        <UnitsInfo units={property.units} />
      </div>
      <UnitList units={property.units} />
    </div>
  );
};

export default PropertyDetailsPage;
