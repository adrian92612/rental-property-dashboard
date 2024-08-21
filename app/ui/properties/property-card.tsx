import { PropertyWithUnits } from "@/app/lib/actions";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import { DeleteEditBtn } from "../delete-edit-button";

interface Props {
  property: PropertyWithUnits;
}

export const PropertyCard = ({ property }: Props) => {
  const { id, name, address, createdAt, units } = property;

  return (
    <div className="flex border-t-4 p-2 mt-2 text-sm">
      <div className="w-[300px] h-[200px] flex justify-center items-center">Image Container</div>
      <div className="flex flex-col">
        <h2 className="font-poppins font-normal text-xl ">{name}</h2>
        <p className="flex items-center gap-2 ">
          <FaLocationDot /> {address}
        </p>
        <p>
          <strong>No. of Units:</strong> {units.length}
        </p>
        <div></div>
        <p>
          <strong>Created At:</strong> {createdAt.toISOString().split("T")[0]}
        </p>
        <Link href={`/dashboard/properties/${id}`} className="mt-auto w-fit text-rose-400">
          View Details
        </Link>
        <DeleteEditBtn id={id} model="property" />
      </div>
    </div>
  );
};
