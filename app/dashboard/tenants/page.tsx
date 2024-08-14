import { getTenants } from "@/app/lib/actions";
import { TenantsPageClient } from "@/app/ui/tenants/tenants-page";

const TenantsPage = async () => {
  const tenants = await getTenants();
  console.log(tenants);
  return <TenantsPageClient tenants={tenants} />;
};

export default TenantsPage;
