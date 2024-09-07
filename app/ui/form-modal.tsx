"use client";

import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { IoKey, IoPersonAdd } from "react-icons/io5";
import { MdAddHome } from "react-icons/md";

type FormModalProps = {
  label: "Property" | "Unit" | "Tenant";
  children?: React.ReactNode;
};

export const FormModal = ({ children, label }: FormModalProps) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const toggleForm = () => setShowForm(!showForm);

  return (
    <>
      <div
        className={
          "flex justify-center sm:justify-end sticky top-0 px-8 py-4 backdrop-blur-sm items-center  mx-auto z-10"
        }
      >
        <button
          onClick={toggleForm}
          className="w-fit text-rose-500 border-rose-500 border font-bold flex items-center gap-1 px-4 rounded-md hover:bg-rose-500 hover:text-gray-50"
        >
          {label === "Property" ? (
            <MdAddHome />
          ) : label === "Unit" ? (
            <IoKey />
          ) : (
            <IoPersonAdd />
          )}
          Add {label}
        </button>
      </div>
      {showForm && (
        <div className="p-4 backdrop-blur-sm order-0 sm:order-2 text-gray-100 fixed inset-0 flex justify-center items-center z-10">
          <div className="bg-cyan-800 p-5 rounded-lg shadow-lg max-w-[500px] w-full">
            <button
              onClick={toggleForm}
              className="flex items-center gap-1 hover:font-bold hover:text-gray-900 ml-auto text-lg"
            >
              <IoIosCloseCircle />
              Close
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
