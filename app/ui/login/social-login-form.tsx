import { socialLogin } from "@/app/lib/actions";
import { FaGithub, FaGoogle } from "react-icons/fa";

export const SocialLoginForm = () => {
  return (
    <form action={socialLogin} className="w-full">
      <p className="text-center">Log in using</p>
      <div className="flex items-center justify-around gap-2">
        <button
          name="action"
          value="google"
          className="flex items-center gap-2"
        >
          <FaGoogle />
          Google
        </button>
        <button
          name="action"
          value="github"
          className="flex items-center gap-2"
        >
          <FaGithub />
          Github
        </button>
      </div>
    </form>
  );
};
