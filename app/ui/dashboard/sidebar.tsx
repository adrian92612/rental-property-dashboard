import { logout } from "@/app/lib/actions";
import Link from "next/link";
import { BsBuildingsFill, BsPeopleFill } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";

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
  return (
    <div className="w-[250px] flex flex-col gap-2 bg-cyan-900 p-5 text-gray-200 text-lg font-poppins">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className={linkClass}>
          {link.icon} {link.label}
        </Link>
      ))}

      <form action={logout} className="mt-auto pt-2 text-lg">
        <button className={linkClass}>
          <FaSignOutAlt /> Sign Out
        </button>
      </form>
    </div>
  );
};
