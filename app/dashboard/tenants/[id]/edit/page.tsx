import { getTenant, TenantWithUnit } from "@/app/lib/actions";
import { EditTenantForm } from "@/app/ui/tenants/edit-tenant-form";
import { redirect } from "next/navigation";

const EditTenantPage = async ({ params }: { params: { id: string } }) => {
  const tenant = (await getTenant(params.id)) as TenantWithUnit;
  console.log(tenant);

  if (!tenant) redirect("/dashboard/tenants");

  return (
    <div className="bg-slate-100 h-full flex flex-col items-center gap-4">
      <h1 className="font-bold text-lg mt-10">Edit Tenant&apos;s Details</h1>
      <EditTenantForm tenant={tenant} />
    </div>
  );
};

export default EditTenantPage;
