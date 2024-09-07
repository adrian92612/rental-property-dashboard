import { RegisterForm } from "@/app/ui/register/register-form";

const RegisterPage = async () => {
  return (
    <div className="h-full flex justify-center items-center bg-gradient-to-r from-slate-300 to-slate-500">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
