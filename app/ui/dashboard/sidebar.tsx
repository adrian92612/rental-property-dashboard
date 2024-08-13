import { logout } from "@/app/lib/actions";
import Link from "next/link";

export const SideBar = () => {
  return (
    <div className="w-[250px] flex flex-col border bg-red-200">
      <Link href="/">Overview</Link>
      <Link href="/dashboard/properties">Properties</Link>
      <Link href="/dashboard/units">Units</Link>
      <Link href="/dashboard/tenants">Tenants</Link>

      <form action={logout} className="mt-auto pt-2">
        <button>Sign Out</button>
      </form>
    </div>
  );
};
