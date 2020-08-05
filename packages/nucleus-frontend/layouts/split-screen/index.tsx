import React from "react";
import { background, logo } from "./index.module.css";

export function SplitScreen({
  children,
}: React.PropsWithChildren<{}>): React.ReactElement {
  const year = new Date().getFullYear();

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex w-full max-w-2xl">
        <div className="flex flex-col justify-center w-full max-w-md p-8 mx-auto">
          {children}
          <footer className="mt-8 text-xs text-gray-400">
            &copy; {year}. All Rights Reserved.
          </footer>
        </div>
      </div>
      <div className={background}>
        <div className={logo} />
      </div>
    </div>
  );
}
