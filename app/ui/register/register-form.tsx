"use client";

import { registerUser } from "@/app/lib/actions";
import { useActionState } from "react";
import { Input, Label } from "../form-elements";
import { FieldError } from "../field-error";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const RegisterForm = () => {
  const [state, action, isPending] = useActionState(registerUser, {});
  const router = useRouter();

  if (!!state.success) {
    router.push("/login");
    return (
      <div className="p-5 bg-gray-50 rounded-xl shadow-lg shadow-black">
        <p className="font-bold text-lg text-emerald-700">{state.success}</p>
        <p className="text-right">
          Redirecting to{" "}
          <Link href="/login" className="font-bold underline">
            login page
          </Link>{" "}
          ...
        </p>
      </div>
    );
  }
  return (
    <form
      action={action}
      className="flex flex-col w-full max-w-md border bg-gray-50 p-4 shadow-lg shadow-black rounded-xl "
    >
      <Label htmlFor="email">Email</Label>
      <Input
        name="email"
        id="email"
        placeholder="john.doe@example.com"
        defaultValue={state.email}
      />
      <FieldError error={state.fieldErrors} label={"email"} />

      <Label htmlFor="firstName">First Name</Label>
      <Input
        name="firstName"
        id="firstName"
        placeholder="John"
        defaultValue={state.firstName}
      />
      <FieldError error={state.fieldErrors} label={"firstName"} />

      <Label htmlFor="lastName">First Name</Label>
      <Input
        name="lastName"
        id="lastName"
        placeholder="Doe"
        defaultValue={state.lastName}
      />
      <FieldError error={state.fieldErrors} label={"lastName"} />

      <Label htmlFor="password">Password</Label>
      <Input
        name="password"
        id="password"
        type="password"
        placeholder="Create a password"
        defaultValue={state.password}
      />
      <FieldError error={state.fieldErrors} label={"password"} />

      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Input
        name="confirmPassword"
        id="confirmPassword"
        type="password"
        placeholder="Confirm your Password"
        defaultValue={state.confirmPassword}
      />
      <FieldError error={state.fieldErrors} label={"confirmPassword"} />

      <button
        className="font-poppins font-bold text-xl border border-cyan-900 rounded-xl hover:bg-cyan-900 hover:text-gray-50"
        disabled={isPending}
      >
        {isPending ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};
