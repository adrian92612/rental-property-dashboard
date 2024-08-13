import { auth } from "@/auth";

const OverviewPage = async () => {
  const session = await auth();
  console.log(session?.user);
  return <div>Overview Page</div>;
};

export default OverviewPage;
