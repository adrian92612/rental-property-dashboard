"use client";

import { useState } from "react";
import { PropertyCard } from "./property-card";
import { PropertyWithUnits } from "@/app/lib/actions";
import { MdAddHome } from "react-icons/md";
import { PropertyForm } from "./property-form";
import { IoIosCloseCircle } from "react-icons/io";

interface Props {
  properties: PropertyWithUnits[];
}

export const PropertiesPageClient = ({ properties }: Props) => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm(!showForm);
  return (
    <div className="h-full flex">
      <div className="grow border overflow-y-auto p-5 scrollbar-thin">
        <h1 className="font-poppins text-2xl text-center mb-5 font-bold">PROPERTIES</h1>
        <button
          onClick={toggleForm}
          className=" text-rose-400 border-rose-400 border flex items-center gap-1 px-1 rounded-md hover:text-rose-500 hover:border-rose-500"
        >
          <MdAddHome /> Add Property
        </button>
        {properties.length ? (
          <ul className="flex flex-col gap-5">
            {properties.map((property) => (
              <li key={property.id}>
                <PropertyCard property={property} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No properties listed...</p>
        )}
      </div>
      {showForm && (
        <div className="w-[400px] p-6">
          <button
            onClick={toggleForm}
            className="flex items-center gap-1 hover:font-bold hover:text-gray-900"
          >
            <IoIosCloseCircle />
            Close
          </button>
          <PropertyForm property={null} />
        </div>
      )}
    </div>
  );
};
