import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";

type DetailsButtonProp = {
  id: string;
  route: "properties" | "units" | "tenants";
};

export const DetailsButton = ({ id, route }: DetailsButtonProp) => {
  return (
    <Link href={`/dashboard/${route}/${id}/edit`}>
      <FaRegEdit />
    </Link>
  );
};
