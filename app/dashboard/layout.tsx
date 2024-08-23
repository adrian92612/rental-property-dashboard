import { Suspense } from "react";
import { logout } from "../lib/actions";
import { SideBar } from "../ui/dashboard/sidebar";
import Loading from "./loading";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: Props) => {
  return (
    <main className="h-screen sm:flex">
      <SideBar />
      <Suspense fallback={<Loading />}>
        <section className="grow ">{children}</section>
      </Suspense>
    </main>
  );
};

export default DashboardLayout;
