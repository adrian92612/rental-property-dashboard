import { getProperty } from "@/app/lib/actions-properties";
import { getTenant } from "@/app/lib/actions-tenants";
import { formatDate } from "@/app/lib/helpers";
import { DeleteEditBtn } from "@/app/ui/delete-edit-button";
import { Tenant, Unit } from "@prisma/client";

const cardClass =
  "flex flex-col p-2 w-full max-w-[400px] bg-gray-300 border h-fit rounded-xl text-cyan-900 shadow-lg";

const TenantDetails = ({ tenant }: { tenant: Tenant }) => {
  const getStatus = () => {
    const currentDate = new Date();
    return currentDate < tenant.leaseStart
      ? "Upcoming"
      : currentDate > tenant.leaseEnd
      ? "Expired"
      : "Active";
  };

  return (
    <div className={cardClass}>
      <h2 className="detail-card-h2">Tenant Details</h2>
      <p>
        Full Name: {tenant.firstName} {tenant.lastName}
      </p>
      <p>Email: {tenant.email}</p>
      <p>Phone Number: {tenant.phoneNumber}</p>
      <p>Lease Term: {tenant.termInMonths} months</p>
      <p>Start Date: {formatDate(tenant.leaseStart)}</p>
      <p>End Date: {formatDate(tenant.leaseEnd)}</p>
      <p>Status: {getStatus()}</p>
      <DeleteEditBtn id={tenant.id} model={"tenant"} />
      <button className="detail-card-btn">Send Rent Reminder</button>
    </div>
  );
};

const TenantUnitDetails = async ({ unit }: { unit: Unit }) => {
  const property = await getProperty(unit.propertyId);

  const getDueDate = () => {
    const n = unit.dueDate;
    let suffix: string = "th";
    if (n === 1 || n === 21 || n === 31) suffix = "st";
    if (n === 2 || n === 22) suffix = "nd";
    if (n === 3 || n === 23) suffix = "rd";
    return n + suffix;
  };
  return (
    <div className={cardClass}>
      <h2 className="detail-card-h2">Unit Information</h2>
      <p>Unit Number: {unit.number}</p>
      <p>Property Name: {property?.name}</p>
      <p>Property Address: {property?.address}</p>
      <p>Due Date: {getDueDate()} of each month</p>
    </div>
  );
};

const FinancialInfo = () => {
  return (
    <div className={cardClass}>
      <h2 className="detail-card-h2">Financial Information</h2>
      <p>Security Deposit: $1,200</p>
      <p>Outstanding Balance: $0.00</p>
    </div>
  );
};

const MaintenanceAndRequests = () => {
  return (
    <div className={cardClass}>
      <h2 className="detail-card-h2">Maintenance & Requests</h2>
      <div className="flex items-center gap-2">
        Maintenance and Requests
        <button className="detail-card-btn">View All</button>
      </div>
      <button className="detail-card-btn mt-1">
        Add a maintenance request
      </button>
    </div>
  );
};

const LeaseAgreementAndAttachments = () => {
  return (
    <div className={cardClass}>
      <h2 className="detail-card-h2">Lease Agreement & Attachments</h2>
      <div className="flex items-center gap-2">
        <p>Lease Agreement</p>
        <button className="detail-card-btn">Download</button>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <p>Inspection Report</p>
        <button className="detail-card-btn">Download</button>
      </div>
    </div>
  );
};

const TenantDetailsPage = async ({ params }: { params: { id: string } }) => {
  const tenant = await getTenant(params.id);

  if (!tenant) return <div>No Tenant Found</div>;

  return (
    <div className="detail-container">
      <div className="flex flex-col gap-4">
        <TenantDetails tenant={tenant} />
        {tenant.unit && <TenantUnitDetails unit={tenant.unit} />}
        <FinancialInfo />
        <MaintenanceAndRequests />
        <LeaseAgreementAndAttachments />
      </div>
    </div>
  );
};

export default TenantDetailsPage;

/*
Tenant Details

Full Name: John Doe
Email: john.doe@example.com
Phone Number: 555-1234
Lease Term: 12 Months
Lease Start Date: January 1, 2024
Lease End Date: December 31, 2024
Status: Active
Unit Information

Unit Number: 101
Property Name: Prima Building
Property Address: 123 Main St, Springfield
Monthly Rent: $1,200
Due Date: 5th of each month
Financial Information

Security Deposit: $1,200
Outstanding Balance: $0
Maintenance and Requests

Recent Maintenance Requests: [List or link]
View All Maintenance Requests: [Button/Link]
Lease Agreements and Attachments

Lease Agreement: [Download Link]
Inspection Reports: [Download Link]
Actions

Edit Tenant Information [Button]
Remove Tenant [Button]
Add Maintenance Request [Button]
Send Rent Reminder [Button]
*/
