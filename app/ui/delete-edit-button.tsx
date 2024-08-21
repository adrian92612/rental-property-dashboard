"use client";

import { deleteProperty, deleteTenant, deleteUnit } from "@/app/lib/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface Props {
  id: string;
  model: "property" | "unit" | "tenant";
}

export const DeleteEditBtn = ({ id, model }: Props) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toggleDelete, setToggleDelete] = useState(false);
  const router = useRouter();

  const handleToggleDelete = () => {
    setError(null);
    setToggleDelete(!toggleDelete);
  };

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

  const handleDelete = async () => {
    try {
      setIsPending(true);
      const { fn, route } = deleteAction[model];
      const res = await fn();
      if (res.success) return router.push(`/dashboard/${route}`);
      setError(res.message);
    } catch (error) {
      console.error("Failed to delete: ", error);
      setError(`Failed to delete ${model}`);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      {!toggleDelete ? (
        <div className="flex items-center gap-2">
          <button
            className="flex items-center italic hover:text-rose-400"
            onClick={handleToggleDelete}
          >
            <MdDelete />
            Delete
          </button>
          <Link
            href={`/dashboard/properties/${id}/edit`}
            className="flex items-center italic hover:text-rose-400"
          >
            <FaEdit />
            Edit
          </Link>
        </div>
      ) : (
        <div>
          <p className="font-bold">Confirm delete?</p>
          <div className="flex gap-2">
            <button onClick={handleDelete} className="hover:text-rose-400">
              {isPending ? "Deleting..." : "Yes"}
            </button>
            <button onClick={handleToggleDelete} className="hover:text-rose-400">
              Cancel
            </button>
          </div>
        </div>
      )}
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};
