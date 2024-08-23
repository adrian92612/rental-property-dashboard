import { Suspense } from "react";
import { SideBar } from "../ui/dashboard/sidebar";
import Loading from "./loading";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: Props) => {
  return (
    <div className="h-screen flex flex-col sm:flex-row">
      <SideBar />
      <Suspense fallback={<Loading />}>
        <main className="flex-1 border-2 px-2 overflow-y-auto scrollbar-thin">
          {children}
        </main>
      </Suspense>
    </div>
  );
};

export default DashboardLayout;
