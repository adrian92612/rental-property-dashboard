import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import { DeleteEditBtn } from "../delete-edit-button";
import { PropertyWithUnits } from "@/app/lib/actions-properties";
import Image from "next/image";

interface Props {
  property: PropertyWithUnits;
}

export const PropertyCard = ({ property }: Props) => {
  const { id, name, address, image, createdAt, units } = property;

  return (
    <div className="flex flex-col max-w-[400px] p-4 text-sm bg-gray-100 rounded-lg shadow-lg shadow-slate-400">
      <div className="relative w-[280px] h-[225px] flex justify-center items-center overflow-hidden">
        <Image
          src={image ? image : ""}
          alt={"image of property"}
          quality={50}
          priority={true}
          style={{ objectFit: "contain" }}
          fill={true}
        />
      </div>
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
        <Link
          href={`/dashboard/properties/${id}`}
          className="mt-auto w-fit text-rose-400"
        >
          View Details
        </Link>
        <DeleteEditBtn id={id} model="property" />
      </div>
    </div>
  );
};
