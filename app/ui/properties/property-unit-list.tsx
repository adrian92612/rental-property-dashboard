"use client";

import { UnitWithTenant } from "@/app/lib/actions-units";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const Headings = () => {
  return (
    <div className="flex items-center my-2 justify-around">
      <div className="flex-1 max-w-24">
        <h3 className="font-poppins font-bold">Unit No.</h3>
      </div>
      <div className="flex-1 max-w-24 hidden xs:block">
        <h3 className="font-poppins font-bold">Rent Amount</h3>
      </div>
      <div className="flex-1 max-w-24 hidden sm:block">
        <h3 className="font-poppins font-bold">Due Date</h3>
      </div>
      <div className="flex-1 max-w-24">
        <h3 className="font-poppins font-bold">Status</h3>
      </div>
    </div>
  );
};

const UnitCard = ({ unit }: { unit: UnitWithTenant }) => {
  const { number, rentAmount, dueDate, tenant } = unit;
  const status = !!tenant ? "Occupied" : "Vacant";
  const statusClass = !!tenant ? "text-red-500" : "text-emerald-500";
  return (
    <div className="flex items-center justify-around">
      <div className="flex-1 max-w-24">
        <p>{number}</p>
      </div>
      <div className="flex-1 max-w-24 hidden xs:block">
        <p>{rentAmount}</p>
      </div>
      <div className="flex-1 max-w-24 hidden sm:block">
        <p>{dueDate ?? "N/A"}</p>
      </div>
      <div className="flex-1 max-w-24">
        <p className={statusClass}>{status}</p>
      </div>
    </div>
  );
};

export const UnitList = ({ units }: { units: UnitWithTenant[] }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const unitsPerPage = 10;

  const startIndex = (currentPage - 1) * unitsPerPage;
  const endIndex = startIndex + unitsPerPage;
  const paginatedUnits = units.slice(startIndex, endIndex);

  const totalPages = Math.ceil(units.length / unitsPerPage);

  const handlePrevPage = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : totalPages);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage < totalPages ? currentPage + 1 : 1);
  };

  return (
    <section className="p-2 rounded-md bg-gray-100 shadow-lg shadow-slate-400 w-11/12 mx-auto">
      <h2 className="font-poppins font-bold text-center text-lg border-b border-cyan-900">
        Unit List
      </h2>

      {paginatedUnits && (
        <>
          <ul>
            <Headings />
            {paginatedUnits.map((unit) => (
              <Link key={unit.id} href={`/dashboard/units/${unit.id}`}>
                <li className="border border-transparent rounded-lg hover:border-rose-400 hover:bg-rose-50  mb-1">
                  <UnitCard unit={unit} />
                </li>
              </Link>
            ))}
          </ul>
          <div className="flex items-center gap-4 justify-end pr-4">
            <button onClick={handlePrevPage}>
              <FaArrowCircleLeft />
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button onClick={handleNextPage}>
              <FaArrowCircleRight />
            </button>
          </div>
        </>
      )}
    </section>
  );
};
