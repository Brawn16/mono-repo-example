import { Steps } from "@sdh-project-services/nucleus-ui/dist/steps";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { FormContext, Context } from "../../contexts/context";
import { background, logo } from "../split-screen/index.module.css";
import { DataProvider } from "./context";

export function NewStarter({
  children,
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
      <div className="flex min-h-screen bg-white">
        <div className="flex w-full max-w-4xl">
          <div className="flex flex-col w-full max-w-3xl p-8 mx-auto justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 md:text-3xl mb-8">
                <span className="md:hidden">New starter</span>
                <span className="hidden md:inline">Register new starter</span>
              </h1>
              <Steps active={active} steps={steps} />
              <span>
                <div className="flex items-center justify-center  w-full h-10 text-white bg-orange-500 text-bold md:hidden">
                  {active?.toUpperCase()}
                </div>
              </span>
              <div className="mt-8 ">{children}</div>
            </div>
            <footer className="mt-8 text-xs text-gray-400">
              &copy; {year}. All Rights Reserved.
            </footer>
          </div>
        </div>
        <div className={background}>
          <div className={logo} />
        </div>
      </div>
    </DataProvider>
  );
}
