import { getTenants } from "@/app/lib/actions-tenants";
import { FormModal } from "@/app/ui/form-modal";
import { TenantForm } from "@/app/ui/tenants/tenant-form";
import { TenantList } from "@/app/ui/tenants/tenant-list";

const TenantsPage = async () => {
  const tenants = await getTenants();

  return (
    <>
      <FormModal label={"Tenant"}>
        <TenantForm tenant={null} />
      </FormModal>
      <div className="min-h-[95%] p-2 mr-2 bg-gray-50 sm:border-l-2 border-cyan-900 shadow-slate-600">
        <h1 className="font-poppins font-bold text-lg text-center">
          Tenant List
        </h1>
        <TenantList tenants={tenants || []} />
      </div>
    </>
  );
};

export default TenantsPage;
