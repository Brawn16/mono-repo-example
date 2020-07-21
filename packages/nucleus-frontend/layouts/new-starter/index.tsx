import React from "react";
import { DataProvider } from "./context";

export function NewStarter({
  children,
}: React.PropsWithChildren<{}>): React.ReactElement {
  const year = new Date().getFullYear();

  return (
    <DataProvider value={{}}>
      <div className="flex flex-col min-h-screen">
        <header className="p-4 bg-black">
          <div className="mx-auto max-w-7xl">
            <img alt="Nucleus" className="h-4" src="/logo.svg" />
          </div>
        </header>
        <h1 className="py-4 text-2xl font-light text-center uppercase">
          New Starter Form
        </h1>
        <div className="text-white uppercase bg-orange-500">
          <div className="py-2 mx-auto text-center max-w-7xl">Preparation</div>
        </div>
        <main className="flex-1 pt-8 mx-auto max-w-7xl">{children}</main>
        <footer className="p-8 pt-0 text-xs text-center text-gray-400">
          &copy; {year}. All Rights Reserved.
        </footer>
      </div>
    </DataProvider>
  );
}
