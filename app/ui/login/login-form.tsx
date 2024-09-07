"use client";

import Link from "next/link";
import { credentialsLogin } from "@/app/lib/actions";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { SocialLoginForm } from "./social-login-form";

export const LoginForm = () => {
  const [state, action, isPending] = useActionState(credentialsLogin, {
    email: "",
    password: "",
    result: "",
  });

  const router = useRouter();

  if (state.success) {
    router.push("/dashboard");
    return <div>{state.result}</div>;
  }

  return (
    <form action={action} className="flex flex-col w-full">
      <label htmlFor="email">Email Address</label>
      <input
        type="text"
        name="email"
        id="email"
        placeholder="john.doe@example.com"
        defaultValue={state.email}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="passowrd"
        placeholder="Enter your password"
        defaultValue={state.password}
      />
      <button type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Log in"}
      </button>
      {state.result && <span>{state.result}</span>}
    </form>
  );
};
