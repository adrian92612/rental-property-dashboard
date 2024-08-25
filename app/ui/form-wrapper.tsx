export const EditFormWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="max-w-[500px] w-full border-cyan-800 bg-cyan-800 border-2 p-4 rounded-lg text-gray-100 shadow-2xl">
      {children}
    </div>
  );
};
