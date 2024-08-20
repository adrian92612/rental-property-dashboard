"use client";

import { AddPropertyForm } from "./add-property-form";
import { useState } from "react";
import { PropertyCard } from "./property-card";
import { PropertyWithUnits } from "@/app/lib/actions";
import { MdAddHome } from "react-icons/md";

interface Props {
  properties: PropertyWithUnits[];
}

export const PropertiesPageClient = ({ properties }: Props) => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm(!showForm);
  return (
    <div className="h-full flex text-gray-800 bg-gray-100">
      <div className="grow border overflow-y-auto p-5">
        <h1 className="font-poppins text-5xl text-center mb-5 font-bold">PROPERTIES</h1>
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
          <button onClick={toggleForm} className="font-bold bg-cyan-900">
            Close
          </button>
          <AddPropertyForm />
        </div>
      )}
    </div>
  );
};
