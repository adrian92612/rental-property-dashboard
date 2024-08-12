"use client";

export const RegisterForm = () => {
  return (
    <div>
      <form action="" className="flex flex-col">
        <label htmlFor="email">Email Address</label>
        <input type="text" name="email" id="email" placeholder="john.doe@example.com" />
        <label htmlFor="fname">First Name</label>
        <input type="text" name="fname" id="fname" placeholder="John" />
        <label htmlFor="lname">Last Name</label>
        <input type="text" name="lname" id="lanem" placeholder="Doe" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" placeholder="Create a password" />
        <label htmlFor="password2">Confirm Password</label>
        <input
          type="password"
          name="password2"
          id="password2"
          placeholder="Confirm your password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
};
