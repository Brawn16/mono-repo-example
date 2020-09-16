import React, { PropsWithChildren } from "react";
import { background } from "./index.module.css";

export function SplitScreen({ children }: PropsWithChildren<{}>) {
  const year = new Date().getFullYear();

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex w-full max-w-2xl">
        <div className="flex flex-col justify-center w-full max-w-md p-8 mx-auto">
          {children}
          <footer className="mt-8 text-xs text-gray-600">
            &copy; {year}. All Rights Reserved.
          </footer>
        </div>
      </div>
      <div className={background} />
    </div>
  );
}
