import { deleteProperty, PropertyWithUnits } from "@/app/lib/actions";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";

interface Props {
  property: PropertyWithUnits;
}

export const PropertyCard = ({ property }: Props) => {
  const { id, name, address, createdAt, units } = property;
  const [toggleDelete, setToggleDelete] = useState(false);

  const handleDelete = () => deleteProperty(id);

  const handleToggleDelete = () => setToggleDelete(!toggleDelete);

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

        {!toggleDelete ? (
          <div className="flex items-center gap-2">
            <button
              className="flex items-center italic hover:text-rose-400"
              onClick={handleToggleDelete}
            >
              <MdDelete />
              Delete
            </button>
            <Link
              href={`/dashboard/properties/${id}/edit`}
              className="flex items-center italic hover:text-rose-400"
            >
              <FaEdit />
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <p className="font-bold">Delete {name}?</p>
            <div className="flex gap-2">
              <button onClick={handleDelete} className="hover:text-rose-400">
                Yes
              </button>
              <button onClick={handleToggleDelete} className="hover:text-rose-400">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
