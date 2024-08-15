"use client";

import { deleteProperty, deleteTenant, deleteUnit } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  id: string;
  model: "property" | "unit" | "tenant";
}

export const DeleteBtn = ({ id, model }: Props) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const deleteAction = {
    property: {
      fn: () => deleteProperty(id),
      route: "properties",
    },
    unit: {
      fn: () => deleteUnit(id),
      route: "units",
    },
    tenant: {
      fn: () => deleteTenant(id),
      route: "tenants",
    },
  };

  const handleClick = async () => {
    try {
      setIsPending(true);
      const { fn, route } = deleteAction[model];
      const res = await fn();
      if (res.success) return router.push(`/dashboard/${route}`);
      setError(`Failed to delete ${model}`);
    } catch (error) {
      console.error("Failed to delete: ", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <button onClick={handleClick} disabled={isPending}>
        {isPending ? `Deleting ${model}...` : "Delete"}
      </button>
      {error && <span className="text-red-500">{error}</span>}
    </>
  );
};
