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
    <div className="bg-blue-100 p-4 rounded">
      <h2 className="font-poppins font-bold text-lg">Unit Details</h2>
      <p>Unit Number: {unit.number}</p>
      <p>Property Name: {unit.property.name}</p>
      <p>Property Address: {unit.property.address}</p>
      <br />
      <p>Rent Amount: {unit.rentAmount}</p>
      <p>Due Date: {unit.dueDate}</p>
      <p>Occupancy Status: {unit.tenant ? "Occupied" : "Vacant"}</p>
      <DeleteEditBtn id={unit.id} model={"unit"} />
      <div className="flex items-center gap-2">
        <button className="italic text-rose-400 border border-rose-400 rounded px-2 hover:text-rose-500 hover:bg-rose-200">
          Add Maintenance Request
        </button>
        <button className="italic text-rose-400 border border-rose-400 rounded px-2 hover:text-rose-500 hover:bg-rose-200">
          Send Rent Reminder
        </button>
        <button className="italic text-rose-400 border border-rose-400 rounded px-2 hover:text-rose-500 hover:bg-rose-200">
          View Lease Agreement
        </button>
      </div>
    </div>
  );
};

const UnitTenantInfo = ({ tenant }: { tenant: Tenant }) => {
  return (
    <div className="bg-blue-100 p-4 rounded">
      <h2 className="font-poppins font-bold text-lg">Tenant Information</h2>
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
    <div className="bg-blue-100 p-4 rounded">
      <h2 className="font-poppins font-bold text-lg">Financial Information</h2>
      <p>Security Deposit: $1200.00</p>
      <p>Outstanding Balance: $0.00</p>
    </div>
  );
};

const UnitMaintenanceInspection = () => {
  return (
    <div className="bg-blue-100 p-4 rounded">
      <h2 className="font-poppins font-bold text-lg">
        Maintenance and Inspection
      </h2>
      <div className="flex items-center gap-2">
        <p>Recent Maintenance Requests: </p>
        <button className="italic text-rose-400 border border-rose-400 rounded px-2 hover:text-rose-500 hover:bg-rose-200">
          View All
        </button>
      </div>
      <div className="flex items-center gap-2">
        <p>Inspection History: </p>
        <button className="italic text-rose-400 border border-rose-400 rounded px-2 hover:text-rose-500 hover:bg-rose-200">
          View All
        </button>
      </div>
    </div>
  );
};

const UnitAttachments = () => {
  return (
    <div className="bg-blue-100 p-4 rounded">
      <h2 className="font-poppins font-bold text-lg">Attachments</h2>
      <div className="flex items-center gap-2">
        <p>Lease Agreement: </p>
        <button className="italic text-rose-400 border border-rose-400 rounded px-2 hover:text-rose-500 hover:bg-rose-200">
          Download
        </button>
      </div>
      <div className="flex items-center gap-2">
        <p>Inspection Report: </p>
        <button className="italic text-rose-400 border border-rose-400 rounded px-2 hover:text-rose-500 hover:bg-rose-200">
          Download
        </button>
      </div>
    </div>
  );
};

const UnitDetailsPage = async ({ params }: { params: { id: string } }) => {
  const unit = await getUnitPropertyTenant(params.id);

  if (!unit) redirect("/dashboard/units");

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="flex flex-col gap-4">
        <UnitDetails unit={unit} />
        {unit.tenant && <UnitTenantInfo tenant={unit.tenant} />}
        <UnitFinancialInfo />
        <UnitMaintenanceInspection />
        <UnitAttachments />
      </div>
    </div>
  );
};

export default UnitDetailsPage;
