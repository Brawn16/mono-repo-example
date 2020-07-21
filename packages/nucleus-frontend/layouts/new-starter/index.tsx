import NextLink from "next/link";
import React from "react";
import { DataProvider } from "./context";
import { stageArrow, stageArrowActive } from "./index.module.css";

export function NewStarter({
  children,
}: React.PropsWithChildren<{}>): React.ReactElement {
  const year = new Date().getFullYear();

  return (
    <DataProvider value={{}}>
      <div className="flex flex-col min-h-screen">
        <header className="py-4 bg-black">
          <div className="mx-auto max-w-7xl">
            <img alt="Nucleus" className="h-4" src="/logo.svg" />
          </div>
        </header>
        <main className="flex-1 w-full mx-auto max-w-7xl">
          <h1 className="py-4 text-2xl font-light text-center uppercase">
            New Starter Form
          </h1>
          <div className="text-lg text-gray-600 uppercase">
            <NextLink href="/new-starter">
              <a className="inline-block" href="/new-starter">
                <div className="flex">
                  <div className="relative flex flex-col justify-center h-10 px-3 bg-gray-300">
                    Preparation
                  </div>
                  <div className={stageArrow} />
                </div>
              </a>
            </NextLink>
            <NextLink href="/new-starter/operative-details">
              <a className="inline-block" href="/new-starter/operative-details">
                <div className="flex">
                  <div className="relative flex flex-col justify-center h-10 px-3 text-white bg-orange-500">
                    Operative Details
                  </div>
                  <div className={`${stageArrow} ${stageArrowActive}`} />
                </div>
              </a>
            </NextLink>
          </div>
          <div className="pt-8">{children}</div>
        </main>
        <footer className="p-8 pt-0 text-xs text-center text-gray-400">
          &copy; {year}. All Rights Reserved.
        </footer>
      </div>
    </DataProvider>
  );
}
