"use client";

import { logout } from "@/app/lib/actions";
import Link from "next/link";
import { useState } from "react";
import { BsBuildingsFill, BsPeopleFill } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { TfiMenuAlt } from "react-icons/tfi";

const linkClass = "flex items-center gap-2 hover:text-gray-500";

const links = [
  {
    href: "/",
    label: "Overview",
    icon: <MdSpaceDashboard />,
  },
  {
    href: "/dashboard/properties",
    label: "Properties",
    icon: <BsBuildingsFill />,
  },
  {
    href: "/dashboard/units",
    label: "Units",
    icon: <FaKey />,
  },
  {
    href: "/dashboard/tenants",
    label: "Tenants",
    icon: <BsPeopleFill />,
  },
];
export const SideBar = () => {
  const [showNav, setShowNav] = useState<boolean>(false);
  return (
    <div className="flex sm:flex-col sm:p-5 justify-between items-center bg-cyan-900 p-2 text-gray-200 text-lg font-poppins">
      <div className="relative flex items-center sm:hidden">
        <button onClick={() => setShowNav(!showNav)} className={linkClass}>
          <TfiMenuAlt />
        </button>
        {showNav && (
          <ul className="absolute top-[200%] z-10 bg-cyan-900 px-2 py-5 flex flex-col gap-2 text-sm">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.icon} {link.label}
              </Link>
            ))}
          </ul>
        )}
      </div>

      <ul className="hidden sm:flex flex-col gap-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={linkClass}>
            {link.icon} {link.label}
          </Link>
        ))}
      </ul>

      <form action={logout} className="mt-auto text-lg">
        <button className={linkClass}>
          <FaSignOutAlt /> Sign Out
        </button>
      </form>
    </div>
  );
};
