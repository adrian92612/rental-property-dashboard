import { socialLogin } from "@/app/lib/actions";
import { FaGithub, FaGoogle } from "react-icons/fa";

export const SocialLoginForm = () => {
  return (
    <form action={socialLogin} className="w-full text-lg">
      <p className="text-center mb-1">Log in using</p>
      <div className="flex items-center justify-around gap-2">
        <button
          name="action"
          value="google"
          className="flex items-center gap-2 border border-cyan-900 rounded-xl px-4 hover:bg-cyan-900 hover:text-gray-50"
        >
          <FaGoogle />
          Google
        </button>
        <button
          name="action"
          value="github"
          className="flex items-center gap-2 border border-cyan-900 rounded-xl px-4 hover:bg-cyan-900 hover:text-gray-50"
        >
          <FaGithub />
          Github
        </button>
      </div>
    </form>
  );
};
