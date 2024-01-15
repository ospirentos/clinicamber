import React from "react";

export function SectionTitle({ title }) {
  return (
    <div className="m-0 flex text-center my-6 before:relative before:w-full before:top-1/2 before:translate-y-1/2 before:border-t-1 before:border-amber-300 before: after:relative after:w-full after:top-1/2 after:translate-y-1/2 after:border-t-1 after:border-amber-300">
      <span className="inline-block px-[calc(8px*1.2)]">
        <h5 className="text-2xl px-4 text-amber-500">{title}</h5>
      </span>
    </div>
  );
}
