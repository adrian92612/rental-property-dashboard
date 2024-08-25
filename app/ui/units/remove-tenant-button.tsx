"use client";

import { removeTenant } from "@/app/lib/actions-units";
import { useState } from "react";

type RemoveTenantProps = {
  unitId: string;
};

export const RemoveTenantButton = ({ unitId }: RemoveTenantProps) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [toggleDelete, setToggleDelete] = useState<boolean>(false);

  const handleRemove = async () => {
    try {
      setIsPending(true);
      await removeTenant(unitId);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      {!toggleDelete ? (
        <button
          onClick={() => setToggleDelete(true)}
          className="italic text-rose-400 border border-rose-400 rounded px-2 hover:text-rose-500 hover:bg-rose-200"
        >
          Remove Tenant
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <p className="italic text-rose-400 border border-rose-400 rounded px-2">
            Remove Tenant?
          </p>
          <button onClick={handleRemove} className="italic hover:text-rose-400">
            {isPending ? "Removing..." : "Yes"}
          </button>
          <button
            onClick={() => setToggleDelete(false)}
            className="italic hover:text-rose-400"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
