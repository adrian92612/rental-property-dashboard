import { deleteProperty } from "@/app/lib/actions";
import { Property, Unit } from "@prisma/client";
import Link from "next/link";

interface PropertyAttributeProps {
  label: string;
  items: { id: string; value: string }[];
}

const PropertyAttribute = ({ label, items }: PropertyAttributeProps) => (
  <div className="flex flex-col gap-4 p-2">
    <h2 className="font-bold text-lg">{label}</h2>
    {items.map(({ id, value }) => (
      <div key={id}>
        <Link href={`/dashboard/properties/${id}`} className="">
          <p>{value}</p>
        </Link>
        {label === "Unit/s" && <button onClick={() => deleteProperty(id)}>Delete</button>}
      </div>
    ))}
  </div>
);

interface PropertyWithUnits extends Property {
  units: Unit[];
}

interface Props {
  properties: PropertyWithUnits[];
}

export const PropertyCard = ({ properties }: Props) => {
  return (
    <div className="flex">
      <PropertyAttribute
        label="Name"
        items={properties.map((prop) => ({ id: prop.id, value: prop.name }))}
      />
      <div className="grow">
        <PropertyAttribute
          label="Address"
          items={properties.map((prop) => ({ id: prop.id, value: prop.address }))}
        />
      </div>
      <PropertyAttribute
        label="Unit/s"
        items={properties.map((prop) => ({
          id: prop.id,
          value: prop.units.length.toString(),
        }))}
      />
    </div>
  );
};
