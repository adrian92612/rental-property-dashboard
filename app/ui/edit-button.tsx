import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";

type EditBtnProps = {
  id: string;
  route: "properties" | "units" | "tenants";
};

export const EditBtn = ({ id, route }: EditBtnProps) => {
  return (
    <Link href={`/dashboard/${route}/${id}/edit`}>
      <FaRegEdit />
    </Link>
  );
};
