import { getTenants } from "@/app/lib/actions-tenants";
import { FormModal } from "@/app/ui/form-modal";
import { TenantForm } from "@/app/ui/tenants/tenant-form";
import { TenantList } from "@/app/ui/tenants/tenant-list";
import { TenantsPageClient } from "@/app/ui/tenants/tenants-page";

const TenantsPage = async () => {
  const tenants = await getTenants();

  return (
    <>
      <FormModal label={"Tenant"}>
        <TenantForm tenant={null} />
      </FormModal>
      <div className="h-full pt-2">
        <h1 className="font-poppins font-bold text-lg text-center">
          Tenant List
        </h1>
        <TenantList tenants={tenants || []} />
      </div>
    </>
  );
};

export default TenantsPage;
