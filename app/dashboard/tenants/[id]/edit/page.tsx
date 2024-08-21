import { getTenant, TenantWithUnit } from "@/app/lib/actions";
import { EditFormWrapper } from "@/app/ui/form-wrapper";
import { TenantForm } from "@/app/ui/tenants/tenant-form";
import { redirect } from "next/navigation";

const EditTenantPage = async ({ params }: { params: { id: string } }) => {
  const tenant = (await getTenant(params.id)) as TenantWithUnit;
  console.log(tenant);

  if (!tenant) redirect("/dashboard/tenants");

  return (
    <div className="bg-slate-100 h-full flex flex-col items-center gap-4">
      <h1 className="font-bold text-lg mt-10">Edit Tenant&apos;s Details</h1>
      <EditFormWrapper>
        <TenantForm tenant={tenant} />
      </EditFormWrapper>
    </div>
  );
};

export default EditTenantPage;
