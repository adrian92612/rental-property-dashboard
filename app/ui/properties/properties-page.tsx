"use client";

import { useState } from "react";
import { PropertyCard } from "./property-card";
import { MdAddHome } from "react-icons/md";
import { PropertyForm } from "./property-form";
import { IoIosCloseCircle } from "react-icons/io";
import { PropertyWithUnits } from "@/app/lib/actions-properties";
import { ToggleFormButton } from "../toggle-form-button";

interface Props {
  properties: PropertyWithUnits[];
}

export const PropertiesPageClient = ({ properties }: Props) => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm(!showForm);
  return (
    <div className="h-screen relative flex flex-col sm:flex-row">
      <div className="sticky top-0 py-4 backdrop-blur-sm flex items-center justify-center border-b-2 sm:hidden">
        <ToggleFormButton
          fn={toggleForm}
          icon={<MdAddHome />}
          label="Add Property"
        />
      </div>
      <div className="flex-1 p-5 order-1">
        <h1 className="font-poppins text-2xl text-center font-bold">
          PROPERTIES
        </h1>
        <div className="sticky hidden sm:flex top-0 pr-8 py-4 backdrop-blur-sm items-center justify-end border-b border-cyan-900 ">
          <ToggleFormButton
            fn={toggleForm}
            icon={<MdAddHome />}
            label="Add Property"
          />
        </div>
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
      {showForm && (
        <div className=" p-4 backdrop-blur-sm order-0 sm:order-2 text-gray-100 fixed inset-0 flex justify-center items-center">
          <div className="bg-cyan-800 p-5 rounded-lg shadow-lg max-w-[500px] w-full">
            <button
              onClick={toggleForm}
              className="flex items-center gap-1 hover:font-bold hover:text-gray-900 ml-auto text-lg"
            >
              <IoIosCloseCircle />
              Close
            </button>
            <PropertyForm property={null} />
          </div>
        </div>
      )}
    </div>
  );
};
