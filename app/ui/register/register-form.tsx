"use client";

import { registerUser } from "@/app/lib/actions";
import { useActionState } from "react";
import { Input, Label } from "../form-elements";
import { FieldError } from "../field-error";

export const RegisterForm = () => {
  const [state, action, isPending] = useActionState(registerUser, {});

  console.log("STATE: ", state);
  return (
    <form
      action={action}
      className="flex flex-col w-full max-w-md border bg-gray-50 p-4 shadow-lg shadow-slate-600 rounded-md "
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
        className="font-poppins font-bold text-xl bg-rose-100 rounded-lg w-fit ml-auto px-5"
        disabled={isPending}
      >
        {isPending ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};
