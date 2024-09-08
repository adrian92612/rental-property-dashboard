"use client";

import { useActionState, useState } from "react";
import { deleteProperty } from "../lib/actions-properties";
import { deleteTenant } from "../lib/actions-tenants";
import { deleteUnit } from "../lib/actions-units";
import { MdAutoDelete, MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";

type DeleteBtnProps = {
  id: string;
  model: "property" | "unit" | "tenant";
};

export const DeleteBtn = ({ id, model }: DeleteBtnProps) => {
  const actions = {
    property: () => deleteProperty(id),
    unit: () => deleteUnit(id),
    tenant: () => deleteTenant(id),
  };
  const [state, action, isPending] = useActionState(actions[model], {
    success: false,
    message: "",
  });
  const [toggleConfirm, setToggleConfirm] = useState(false);
  const router = useRouter();

  const handleToggle = () => setToggleConfirm(!toggleConfirm);

  const handleDelete = async () => {
    handleToggle();
    await action();
  };

  if (state.success) {
    const route =
      model === "property"
        ? "properties"
        : model === "unit"
        ? "units"
        : "tenants";
    router.push(`/dashboard/${route}`);
  }

  return (
    <div className={`relative w-fit`}>
      <button onClick={handleToggle} disabled={isPending}>
        {isPending ? <MdAutoDelete /> : <MdDelete />}
      </button>
      {toggleConfirm && (
        <div className="absolute flex items-center gap-2 px-1 rounded-sm bg-cyan-800 text-gray-50 w-fit bottom-full left-1/2">
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="hover:text-rose-500"
          >
            <IoMdCheckmark />
          </button>
          <button
            onClick={handleToggle}
            disabled={isPending}
            className="hover:text-rose-500"
          >
            <IoClose />
          </button>
        </div>
      )}
    </div>
  );
};
