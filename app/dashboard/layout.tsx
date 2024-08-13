import { logout } from "../lib/actions";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: Props) => {
  return (
    <main className="h-full flex">
      <nav>
        <form action={logout}>
          <button>Sign Out</button>
        </form>
      </nav>
      <section>{children}</section>
    </main>
  );
};

export default DashboardLayout;
