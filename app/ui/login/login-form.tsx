"use client";

import Link from "next/link";

export const LoginForm = () => {
  return (
    <div>
      <form action="" className="flex flex-col">
        <label htmlFor="email">Email Address</label>
        <input type="text" name="email" id="email" placeholder="john.doe@example.com" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="passowrd" placeholder="Enter your password" />
        <button>Log In</button>
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <button>Login using Google</button>
        <div>
          <Link href="/register">Don&apos;t have account? Register here.</Link>
        </div>
      </form>
    </div>
  );
};
