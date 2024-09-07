import { LoginForm } from "@/app/ui/login/login-form";
import { SocialLoginForm } from "@/app/ui/login/social-login-form";
import Link from "next/link";

const LoginPage = async () => {
  return (
    <div className="h-full flex justify-center items-center bg-gradient-to-r from-slate-300 to-slate-500">
      <div className="max-w-[400px] w-[90%] p-4 rounded-xl flex flex-col justify-center items-center border bg-gray-50 border-cyan-900 shadow-lg shadow-black">
        <LoginForm />
        <div className="flex items-center my-4 w-full">
          <div className="flex-grow h-px bg-cyan-900"></div>
          <span className="px-4 text-sm">or</span>
          <div className="flex-grow h-px bg-cyan-900"></div>
        </div>
        <SocialLoginForm />
        <div className="border-b border-cyan-900 mt-2">
          <Link href="/register">Don&apos;t have account? Register here.</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

/*
  create login for admin
*/
