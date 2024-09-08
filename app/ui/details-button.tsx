import Link from "next/link";
import { CiViewList } from "react-icons/ci";

type DetailsBtnProps = {
  id: string;
  route: "properties" | "units" | "tenants";
};

export const DetailsBtn = ({ id, route }: DetailsBtnProps) => {
  return (
    <Link href={`/dashboard/${route}/${id}`}>
      <CiViewList />
    </Link>
  );
};
