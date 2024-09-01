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

const BasicInfo = ({ property }: { property: PropertyWithUnitsAndTenant }) => {
  const { name, address, image, createdAt, updatedAt } = property;
  return (
    <section className="max-w-[700px] p-4 bg-gray-100 shadow-lg shadow-slate-400 rounded-md text-cyan-950">
      <h2 className="font-bold font-poppins text-lg border-b border-cyan-900 px-1 w-full text-center">
        Basic Info
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

const PropertyDetailsPage = async ({ params }: { params: { id: string } }) => {
  const [user, property] = await Promise.all([
    await getUser(),
    await getPropertyWithUnitsAndTenants(params.id),
  ]);

  if (!property || !user) redirect("/dashboard/properties");

  const { name, address, units, createdAt, updatedAt } = property;

  return (
    <div className="flex flex-col gap-4 p-4 overflow-y-auto h-full scrollbar-thin">
      <BasicInfo property={property} />
      <section>
        <h2 className="font-bold font-poppins text-lg border-b-2 border-cyan-900 px-1 w-fit rounded-md">
          Units Info
        </h2>
        <p className="mt-2 font-bold">No. of Units: {units.length}</p>
        <p>Total Monthly Rent: {}</p>
        <p>Average Rent per Unit: </p>
        <p>Outstanding Payments: </p>
        {units.length && (
          <ul className="flex flex-wrap gap-2">
            {units.map((unit) => {
              const tenant = unit.tenant;
              const start = tenant?.leaseStart
                ? formatDate(tenant.leaseStart)
                : "";
              const end = tenant?.leaseEnd ? formatDate(tenant.leaseEnd) : "";
              return (
                <li
                  key={unit.id}
                  className="flex flex-col border border-cyan-900 rounded min-w-48 p-2 "
                >
                  <h3>{unit.number}</h3>
                  <p>Rent: ${unit.rentAmount}</p>
                  <p>Due Date: {unit.dueDate}</p>
                  <p>Status: {tenant ? "Occupied" : "Vacant"}</p>
                  <p>
                    Tenant: {tenant && `${tenant.firstName} ${tenant.lastName}`}
                  </p>
                  <p>Lease Start: {start}</p>
                  <p>Lease End: {end}</p>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
};

export default PropertyDetailsPage;
