"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteProperty } from "../lib/actions-properties";
import { deleteUnit } from "../lib/actions-units";
import { deleteTenant } from "../lib/actions-tenants";

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

  const { fn, route } = deleteAction[model];

  const handleDelete = async () => {
    try {
      setIsPending(true);
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
        <div className="flex items-center gap-1 w-fit border">
          <Link
            href={`/dashboard/${route}/${id}/edit`}
            className="flex items-center italic border border-transparent rounded-sm hover:border-rose-400 hover:text-rose-400"
          >
            <FaEdit />
          </Link>
          <button
            className="flex items-center italic border border-transparent rounded-sm hover:border-rose-500 hover:text-rose-500"
            onClick={handleToggleDelete}
          >
            <MdDelete />
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-1">
            <p className="font-bold">Confirm delete?</p>
            <button onClick={handleDelete} className="hover:text-rose-400">
              {isPending ? "Deleting..." : "Yes"}
            </button>
            <button
              onClick={handleToggleDelete}
              className="hover:text-rose-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};
