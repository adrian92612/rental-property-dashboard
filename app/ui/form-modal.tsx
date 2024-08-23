"use client";

import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

type FormModalProps = {
  variant: "mobile" | "desktop";
  children?: React.ReactNode;
};

export const FormModal = ({ variant, children }: FormModalProps) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const toggleForm = () => setShowForm(!showForm);

  return (
    <>
      <div
        className={`${
          variant === "mobile"
            ? "flex sm:hidden justify-center"
            : "hidden sm:flex justify-end"
        } sticky top-0 px-8 py-4 backdrop-blur-sm items-center border-b border-cyan-900`}
      >
        <button
          onClick={toggleForm}
          className="w-fit text-rose-400 border-rose-400 border flex items-center gap-1 px-2 rounded-md hover:font-bold hover:text-rose-500 hover:border-rose-500"
        >
          show form
        </button>
      </div>
      {showForm && (
        <div className="p-4 backdrop-blur-sm order-0 sm:order-2 text-gray-100 fixed inset-0 flex justify-center items-center">
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
