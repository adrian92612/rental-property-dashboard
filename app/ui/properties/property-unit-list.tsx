"use client";

import { UnitWithTenant } from "@/app/lib/actions-units";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaSearch,
} from "react-icons/fa";

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
  const [paginatedUnits, setPaginatedUnits] = useState(
    units.slice(0, unitsPerPage)
  );
  const [filteredUnits, setFilteredUnits] = useState(units);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(units.length / unitsPerPage)
  );

  useEffect(() => {
    const startIndex = (currentPage - 1) * unitsPerPage;
    const endIndex = startIndex + unitsPerPage;
    setTotalPages(Math.ceil(filteredUnits.length / unitsPerPage));
    setPaginatedUnits(filteredUnits.slice(startIndex, endIndex));
  }, [currentPage, filteredUnits]);

  const handlePrevPage = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : totalPages);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage < totalPages ? currentPage + 1 : 1);
  };

  const handleSearch = useDebouncedCallback((e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredUnits = units.filter((unit) => {
      const status = unit.tenant ? "occupied" : "vacant";
      return (
        unit.number.toLowerCase().includes(searchValue) ||
        unit.dueDate?.toString().includes(searchValue) ||
        unit.rentAmount.toString().includes(searchValue) ||
        status.includes(searchValue)
      );
    });
    setFilteredUnits(filteredUnits);
  }, 300);

  return (
    <section className="p-2 flex flex-col rounded-md border bg-gray-100 shadow-lg shadow-slate-400 w-11/12 mx-auto min-h-96">
      <div className="flex items-center border-b justify-between border-cyan-900 py-2">
        <div className="flex-1 max-w-52 hidden xs:block"></div>
        <h2 className="flex-1 font-poppins font-bold text-center text-lg">
          Unit List
        </h2>
        <div className="flex-1 max-w-52 relative">
          <input
            type="search"
            className=" border w-full px-5 py-1 rounded-md bg-transparent border-cyan-900"
            onChange={(e) => handleSearch(e)}
          />
          <FaSearch className="absolute top-1/2 right-2 translate-y-[-50%]" />
        </div>
      </div>

      {/* {paginatedUnits && (
        <> */}
      <ul>
        <Headings />
        {!!paginatedUnits.length &&
          paginatedUnits.map((unit) => (
            <Link key={unit.id} href={`/dashboard/units/${unit.id}`}>
              <li className="border border-transparent rounded-lg hover:border-rose-400 hover:bg-rose-50 mb-1">
                <UnitCard unit={unit} />
              </li>
            </Link>
          ))}
      </ul>
      <div className="flex items-center gap-4 justify-end pr-4 text-lg mt-auto">
        <button
          onClick={handlePrevPage}
          className="border hover:border-rose-400 rounded-full"
        >
          <FaArrowCircleLeft />
        </button>
        <span>
          {totalPages ? currentPage : 0} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className="border hover:border-rose-400 rounded-full"
        >
          <FaArrowCircleRight />
        </button>
      </div>
      {/* </>
      )} */}
    </section>
  );
};
