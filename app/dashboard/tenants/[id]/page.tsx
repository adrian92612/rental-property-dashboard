import { getTenant } from "@/app/lib/actions";
import { DeleteEditBtn } from "@/app/ui/delete-edit-button";
import Link from "next/link";
import { redirect } from "next/navigation";

const TenantDetailsPage = async ({ params }: { params: { id: string } }) => {
  const tenant = await getTenant(params.id);

  if (!tenant) redirect("/dashboard/tenants");
  return (
    <div>
      <h1>Tenant Details</h1>
      <p>{JSON.stringify(tenant)}</p>
      <DeleteEditBtn id={tenant.id} model="tenant" />
    </div>
  );
};

export default TenantDetailsPage;
