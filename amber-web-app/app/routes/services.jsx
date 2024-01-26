import { Outlet } from "@remix-run/react";

export default function Services() {
  return (
    <div className="flex flex-1 items-center w-full h-auto justify-center">
      <div className="px-6 w-full max-w-[1024px]">
        <Outlet />
      </div>
    </div>
  );
}
