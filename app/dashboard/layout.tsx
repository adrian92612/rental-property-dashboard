import { logout } from "../lib/actions";
import { SideBar } from "../ui/dashboard/sidebar";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: Props) => {
  return (
    <main className="h-full flex">
      <SideBar />
      <section className="grow">{children}</section>
    </main>
  );
};

export default DashboardLayout;
