"use client";

import Link from "next/link";
import { credentialsLogin } from "@/app/lib/actions";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../form-elements";

export const LoginForm = () => {
  const [state, action, isPending] = useActionState(credentialsLogin, {});

  const router = useRouter();

  if (state.success) {
    router.push("/dashboard");
    return (
      <div className="w-full">
        <p className="text-emerald-700 text-lg font-bold text-center">
          {state.result}
        </p>
        <p className="text-right">
          Redirecting to{" "}
          <Link href="/dashboard" className="font-bold underline">
            dashboard
          </Link>{" "}
          ...
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col w-full">
      <Input
        name="email"
        id="email"
        placeholder="Email Address"
        defaultValue={state.email}
      />

      <Input
        name="password"
        id="password"
        type="password"
        placeholder="Password"
        defaultValue={state.password}
      />

      {state.result && <span className="text-red-400">* {state.result}</span>}
      <button
        type="submit"
        disabled={isPending}
        className="text-lg font-bold px-4 border rounded-xl border-cyan-900 hover:bg-cyan-900 hover:text-gray-50"
      >
        {isPending ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
};
