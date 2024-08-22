type ToggleFormButtonProps = {
  fn: () => void;
  icon: React.ReactNode;
  label: string;
};

export const ToggleFormButton = ({
  fn,
  icon,
  label,
}: ToggleFormButtonProps) => {
  return (
    <button
      onClick={fn}
      className="w-fit text-rose-400 border-rose-400 border flex items-center gap-1 px-2 rounded-md hover:font-bold hover:text-rose-500 hover:border-rose-500"
    >
      {icon}
      {label}
    </button>
  );
};
