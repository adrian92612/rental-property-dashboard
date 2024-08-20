import { PropertyWithUnits } from "@/app/lib/actions";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";

interface Props {
  property: PropertyWithUnits;
}

export const PropertyCard = ({ property }: Props) => {
  const { id, name, address, createdAt, units } = property;

  return (
    <div className="flex border-t-2 p-2 mt-2">
      <div className="w-[300px] h-[200px] flex justify-center items-center">Image Container</div>
      <div className="flex flex-col">
        <h2 className="font-bold text-3xl ">{name}</h2>
        <p className="flex items-center gap-2 ">
          <FaLocationDot /> {address}
        </p>
        <p>
          <strong>No. of Units:</strong> {units.length}
        </p>
        <div></div>
        <p>
          <strong>Created At:</strong> {createdAt.toISOString()}
        </p>
        <Link href={`/dashboard/properties/${id}`} className="mt-auto w-fit">
          View Details
        </Link>
      </div>
    </div>
  );
};
