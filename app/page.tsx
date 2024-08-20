import Link from "next/link";

const HomePage = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1>Rental Property Dashboard</h1>
      <Link href="/login">Log In</Link>
    </div>
  );
};

export default HomePage;
