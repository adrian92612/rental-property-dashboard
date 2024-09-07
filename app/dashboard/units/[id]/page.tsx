import {
  getUnitPropertyTenant,
  UnitWithPropertyTenant,
} from "@/app/lib/actions-units";
import { formatDate } from "@/app/lib/helpers";
import { DeleteEditBtn } from "@/app/ui/delete-edit-button";
import { RemoveTenantButton } from "@/app/ui/units/remove-tenant-button";
import { Tenant } from "@prisma/client";
import { redirect } from "next/navigation";

type UnitDetailsProp = {
  unit: UnitWithPropertyTenant;
};

const UnitDetails = ({ unit }: UnitDetailsProp) => {
  return (
    <div className="detail-card">
      <h2 className="detail-card-h2">Unit Details</h2>
      <p>Unit Number: {unit.number}</p>
      <p>Property Name: {unit.property.name}</p>
      <p>Property Address: {unit.property.address}</p>
      <br />
      <p>Rent Amount: {unit.rentAmount}</p>
      <p>Due Date: {unit.dueDate}</p>
      <p>Occupancy Status: {unit.tenant ? "Occupied" : "Vacant"}</p>
      <DeleteEditBtn id={unit.id} model={"unit"} />
      <div className="flex items-center gap-2">
        <button className="detail-card-btn w-full">Send Rent Reminder</button>
        <button className="detail-card-btn w-full">View Lease Agreement</button>
      </div>
    </div>
  );
};

const UnitTenantInfo = ({ tenant }: { tenant: Tenant }) => {
  return (
    <div className="detail-card">
      <h2 className="detail-card-h2">Tenant Information</h2>
      <p>
        Name: {tenant.firstName} {tenant.lastName}
      </p>
      <p>Email: {tenant.email}</p>
      <p>Phone Number: {tenant.phoneNumber}</p>
      <p>Term: {tenant.termInMonths} Months</p>
      <p>Lease Start: {formatDate(tenant.leaseStart)}</p>
      <p>Lease End: {formatDate(tenant.leaseEnd)}</p>
      <RemoveTenantButton unitId={tenant.unitId!} />
    </div>
  );
};

const UnitFinancialInfo = () => {
  return (
    <div className="detail-card">
      <h2 className="detail-card-h2">Financial Information</h2>
      <p>Security Deposit: $1200.00</p>
      <p>Outstanding Balance: $0.00</p>
    </div>
  );
};

const UnitMaintenanceInspection = () => {
  return (
    <div className="detail-card">
      <h2 className="detail-card-h2">Maintenance and Inspection</h2>
      <div className="flex items-center gap-2">
        <p>Recent Maintenance Requests: </p>
        <button className="detail-card-btn">View All</button>
      </div>
      <div className="flex items-center gap-2">
        <p>Inspection History: </p>
        <button className="detail-card-btn">View All</button>
      </div>
      <button className="detail-card-btn mt-1">Add Maintenance Request</button>
    </div>
  );
};

const UnitAttachments = () => {
  return (
    <div className="detail-card">
      <h2 className="detail-card-h2">Attachments</h2>
      <div className="flex items-center gap-2">
        <p>Lease Agreement: </p>
        <button className="detail-card-btn">Download</button>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <p>Inspection Report: </p>
        <button className="detail-card-btn">Download</button>
      </div>
    </div>
  );
};

const UnitDetailsPage = async ({ params }: { params: { id: string } }) => {
  const unit = await getUnitPropertyTenant(params.id);

  if (!unit) redirect("/dashboard/units");

  return (
    <div className="detail-container">
      <UnitDetails unit={unit} />
      {unit.tenant && <UnitTenantInfo tenant={unit.tenant} />}
      <UnitFinancialInfo />
      <UnitMaintenanceInspection />
      <UnitAttachments />
    </div>
  );
};

export default UnitDetailsPage;
