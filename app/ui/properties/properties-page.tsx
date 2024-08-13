"use client";

import { Property } from "@prisma/client";
import { AddPropertyForm } from "./add-property-form";
import { useState } from "react";

interface Props {
  properties: Property[];
}

export const PropertiesPageClient = ({ properties }: Props) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="h-full flex bg-slate-100">
      <div className="grow border">
        <h1>Properties</h1>
        <button onClick={() => setShowForm(!showForm)}>Add a Property</button>
        {properties.length ? (
          properties.map((property) => <p key={property.id}>{property.name}</p>)
        ) : (
          <p>No properties listed...</p>
        )}
      </div>
      {showForm && (
        <div className="w-[400px]">
          <AddPropertyForm />
        </div>
      )}
    </div>
  );
};
