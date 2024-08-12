interface Props {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: Props) => {
  return (
    <main className="h-full flex">
      <nav></nav>
      <section>{children}</section>
    </main>
  );
};

export default DashboardLayout;
