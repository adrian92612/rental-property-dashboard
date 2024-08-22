import { getTenants } from "@/app/lib/actions-tenants";
import { TenantsPageClient } from "@/app/ui/tenants/tenants-page";

const TenantsPage = async () => {
  const tenants = await getTenants();
  return <TenantsPageClient tenants={tenants} />;
};

export default TenantsPage;
