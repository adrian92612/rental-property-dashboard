import Link from "next/link";

const HomePage = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center bg-gradient-to-r from-slate-300 to-slate-500">
      <h1>Rental Property Dashboard</h1>
      <Link href="/login">Log In</Link>
    </div>
  );
};

export default HomePage;
