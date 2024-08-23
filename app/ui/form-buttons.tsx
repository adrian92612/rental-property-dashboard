import Link from "next/link";
import { IoIosCheckmarkCircle } from "react-icons/io";

interface Props {
  isPending: boolean;
  isEditMode: boolean;
  cancelUrl: string;
}

export const FormButtons = ({ isPending, isEditMode, cancelUrl }: Props) => {
  return (
    <div className="flex gap-2 text-rose-400">
      <button
        type="submit"
        disabled={isPending}
        className="flex items-center gap-1 hover:text-rose-500 hover:font-bold"
      >
        <IoIosCheckmarkCircle />
        {isPending
          ? isEditMode
            ? "Updating..."
            : "Adding..."
          : isEditMode
          ? "Update"
          : "Add"}
      </button>
      {isEditMode && (
        <Link href={cancelUrl} className="hover:text-rose-500 hover:font-bold">
          {isPending ? "Canceling..." : "Cancel"}
        </Link>
      )}
    </div>
  );
};
