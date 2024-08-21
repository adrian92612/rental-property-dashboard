export const EditFormWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="w-[400px] border-cyan-900 border-2 p-4 rounded-lg">
      {children}
    </div>
  );
};
