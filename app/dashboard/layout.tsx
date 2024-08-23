import { Suspense } from "react";
import { logout } from "../lib/actions";
import { SideBar } from "../ui/dashboard/sidebar";
import Loading from "./loading";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: Props) => {
  return (
    <div className="h-screen flex flex-col sm:flex-row">
      <SideBar />
      <main className="sm:flex-1 overflow-y-auto scrollbar-thin">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
