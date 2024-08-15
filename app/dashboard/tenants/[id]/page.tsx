import { getTenant } from "@/app/lib/actions";
import { DeleteBtn } from "@/app/ui/delete-button";
import Link from "next/link";
import { redirect } from "next/navigation";

const TenantDetailsPage = async ({ params }: { params: { id: string } }) => {
  const tenant = await getTenant(params.id);

  if (!tenant) redirect("/dashboard/tenants");
  return (
    <div>
      <h1>Tenant Details</h1>
      <p>{JSON.stringify(tenant)}</p>
      <DeleteBtn id={tenant.id} model="tenant" />
      <Link href={`/dashboard/tenants/${tenant.id}/edit`}>Edit</Link>
    </div>
  );
};

export default TenantDetailsPage;
