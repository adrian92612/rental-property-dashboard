"use client";

import { Property, Unit } from "@prisma/client";
import { AddPropertyForm } from "./add-property-form";
import { useState } from "react";
import { PropertyCard } from "./properties-card";

interface PropertyWithUnits extends Property {
  units: Unit[];
}

interface Props {
  properties: PropertyWithUnits[];
}

export const PropertiesPageClient = ({ properties }: Props) => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm(!showForm);
  return (
    <div className="h-full flex bg-slate-100">
      <div className="grow border">
        <h1>Properties</h1>
        <button onClick={toggleForm}>Add a Property</button>
        {properties.length ? (
          <PropertyCard properties={properties} />
        ) : (
          <p>No properties listed...</p>
        )}
      </div>
      {showForm && (
        <div className="w-[400px] p-6">
          <button onClick={toggleForm}>Close</button>
          <AddPropertyForm />
        </div>
      )}
    </div>
  );
};
