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
          "flex justify-center sm:justify-end sticky top-0 px-8 py-2 backdrop-blur-sm items-center  mx-auto z-10"
        }
      >
        <button
          onClick={toggleForm}
          className="w-fit text-rose-400 border-rose-400 border-2 font-bold flex items-center gap-1 px-2 rounded-md hover:bg-rose-200 hover:text-rose-500 hover:border-rose-500"
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
