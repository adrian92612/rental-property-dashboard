"use client";

import { Property, Unit } from "@prisma/client";
import { useState } from "react";
import { AddUnitForm } from "./add-unit-form";
import Link from "next/link";

interface PropertyWithUnits extends Property {
  units: Unit[];
}

interface Props {
  properties: PropertyWithUnits[];
}

export const UnitsPageClient = ({ properties }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm(!showForm);
  return (
    <div className="h-full flex bg-slate-100">
      <div className="grow border">
        <h1>Units</h1>
        <button onClick={toggleForm}>Add a Unit</button>
        {properties.length ? (
          properties.map((prop) =>
            prop.units.map((unit) => (
              <div key={unit.id}>
                <Link href={`/dashboard/units/${unit.id}`}>{unit.number}</Link>
              </div>
            ))
          )
        ) : (
          <p>No units listed...</p>
        )}
      </div>
      {showForm && (
        <div className="w-[400px] p-6">
          <button onClick={toggleForm}>Close</button>
          <AddUnitForm properties={properties} />
        </div>
      )}
    </div>
  );
};
