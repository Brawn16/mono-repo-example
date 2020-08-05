import { Steps } from "@sdh-project-services/nucleus-ui/dist/steps";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { FormContext, Context } from "../../contexts/context";
import { DataProvider } from "./context";

export function NewStarter({
  children
}: React.PropsWithChildren<{}>): React.ReactElement {
  const { route } = useRouter();
  const year = new Date().getFullYear();
  const { stepsCompleted, updateStoreWithFormData } = useContext<
    FormContext | any
  >(Context);
  const steps = stepsCompleted(route);
  // Find step with matching route
  const { label: active } = steps.find(({ href }: any) => href === route) || {};
  useEffect(() => {
    updateStoreWithFormData();
  }, []);
  return (
    <DataProvider value={{}}>
      <div className="flex flex-col min-h-screen">
        <header className="py-4 bg-black">
          <div className="max-w-3xl mx-auto">
            <img alt="Nucleus" className="h-4" src="/logo.svg" />
          </div>
        </header>
        <main className="flex-1 w-full max-w-3xl mx-auto">
          <h1 className="py-4 text-3xl font-light text-center uppercase">
            New Starter Form
          </h1>
          <Steps active={active} steps={steps} />
          <span>
            <div className="flex items-center justify-center  w-full h-10 text-white bg-orange-500 text-bold md:hidden">
              {active?.toUpperCase()}
            </div>
          </span>
          <div className="pt-8">{children}</div>
        </main>
        <footer className="p-8 text-xs text-center text-gray-400">
          &copy; {year}. All Rights Reserved.
        </footer>
      </div>
    </DataProvider>
  );
}
