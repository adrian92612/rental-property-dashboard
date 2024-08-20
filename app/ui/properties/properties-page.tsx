"use client";

import { AddPropertyForm } from "./add-property-form";
import { useState } from "react";
import { PropertyCard } from "./property-card";
import { PropertyWithUnits } from "@/app/lib/actions";

interface Props {
  properties: PropertyWithUnits[];
}

export const PropertiesPageClient = ({ properties }: Props) => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm(!showForm);
  return (
    <div className="h-full flex ">
      <div className="grow border overflow-y-auto p-5">
        <h1 className="font-bold text-5xl text-center mb-5">Properties</h1>
        <button onClick={toggleForm} className="font-bold">
          Add Property +
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
          <button onClick={toggleForm} className="font-bold ">
            Close
          </button>
          <AddPropertyForm />
        </div>
      )}
    </div>
  );
};
