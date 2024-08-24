"use client";

import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "./actions/authenticate";

export default function Login() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <main className="flex min-h-screen flex-col">
      <div className="fixed -z-0 h-screen min-h-screen w-full bg-gray-500" />
      <header className="z-10 mx-auto my-0 min-w-[66%] max-w-screen-lg p-6 text-3xl">
        Debt Tracer
      </header>
      <div className="relative z-10 mx-auto my-0 min-h-96 w-full max-w-md bg-black/50 px-16 py-12">
        <h1 className="mb-7 text-3xl">Sign In</h1>
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
      </div>
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
