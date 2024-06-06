"use client";

import React from "react";
import { authenticate } from "./actions/authenticate";
import { useFormState, useFormStatus } from "react-dom";

export default function Login() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <main className="flex min-h-screen flex-col p-12">
      <div className="py-4">Login Page</div>
      <form className="flex flex-col" action={dispatch}>
        <input
          className="my-2 text-black"
          type="text"
          name="username"
          placeholder="username"
        />
        <input
          className="my-2 text-black"
          type="password"
          name="password"
          placeholder="password"
        />
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <LoginButton />
      </form>
    </main>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <button aria-disabled={pending} type="submit" onClick={handleClick}>
      Login
    </button>
  );
}
