import Link from "next/link";
import { CiViewList } from "react-icons/ci";

type DetailsButtonProp = {
  id: string;
  route: "properties" | "units" | "tenants";
};

export const DetailsButton = ({ id, route }: DetailsButtonProp) => {
  return (
    <Link href={`/dashboard/${route}/${id}`}>
      <CiViewList />
    </Link>
  );
};
