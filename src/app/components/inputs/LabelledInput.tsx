"use client";

import { useState } from "react";

interface Props {
  label: string;
  id: string;
  name: string;
  type: "text" | "password";
}

export function LabelledInput({ label, id, type, name }: Props) {
  const [isBlank, setIsBlank] = useState(true);

  return (
    <div className="relative">
      <input
        className="peer relative z-10 w-full bg-transparent px-4 pb-2 pt-6 text-base focus:outline-none"
        type={type}
        name={name}
        id={id}
        onChange={(event) => setIsBlank(event.target.value === "")}
        data-is-blank={isBlank}
      />
      <label
        className="[] absolute left-4 right-4 top-4 text-white/70 peer-focus:top-2 peer-focus:text-xs peer-data-[is-blank=false]:top-2 peer-data-[is-blank=false]:text-xs"
        htmlFor="username"
      >
        {label}
      </label>
      <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 rounded border border-solid border-slate-200 bg-transparent" />
    </div>
  );
}
