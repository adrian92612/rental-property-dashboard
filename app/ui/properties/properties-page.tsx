"use client";

import { useState } from "react";
import { PropertyCard } from "./property-card";
import { MdAddHome } from "react-icons/md";
import { PropertyForm } from "./property-form";
import { IoIosCloseCircle } from "react-icons/io";
import { PropertyWithUnits } from "@/app/lib/actions-properties";
import { ToggleFormButton } from "../toggle-form-button";
import { FormModal } from "../show-form";

interface Props {
  properties: PropertyWithUnits[];
}

export const PropertiesPageClient = ({ properties }: Props) => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm(!showForm);
  return (
    <div className="h-screen relative flex flex-col sm:flex-row">
      <FormModal variant={"mobile"}>
        <PropertyForm property={null} />
      </FormModal>
      <div className="flex-1 p-5 order-1">
        <h1 className="font-poppins text-2xl text-center font-bold">
          PROPERTIES
        </h1>
        <FormModal variant={"desktop"}>
          <PropertyForm property={null} />
        </FormModal>
        {properties.length && (
          <ul className="flex flex-col gap-2 flex-wrap">
            {properties.map((property) => (
              <li key={property.id}>
                <PropertyCard property={property} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
