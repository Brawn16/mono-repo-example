import Router from "next/router";
import React from "react";
import { background, logo } from "../split-screen/index.module.css";
import { Context } from "./context";
import { steps } from "./steps";
import { NewStarterFormData } from "./types";

function getLocalFormData(): NewStarterFormData {
  if (typeof window === "object") {
    const form = localStorage.getItem("new-starter");
    if (form !== null) {
      return JSON.parse(form);
    }
  }

  return {
    step: -1,
    values: {},
  };
}

export function NewStarter({
  children,
}: React.PropsWithChildren<{}>): React.ReactElement {
  const { values } = getLocalFormData();
  const year = new Date().getFullYear();

  const submitStep = (
    step: number,
    updatedValues: { [key: string]: string }
  ) => {
    const data = getLocalFormData();
    if (step > data.step) {
      data.step = step;
    }

    data.values = { ...data.values, ...updatedValues };
    localStorage.setItem("new-starter", JSON.stringify(data));

    // Navigate to next step
    const { href } = steps[step + 1];
    Router.push(href);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex w-full max-w-4xl">
        <div className="flex flex-col justify-between w-full max-w-3xl p-8 mx-auto">
          <div>
            <h1 className="mb-8 text-2xl font-extrabold text-gray-900 md:text-3xl">
              <span className="md:hidden">New starter</span>
              <span className="hidden md:inline">Register new starter</span>
            </h1>
            <div className="mt-8">
              <Context.Provider value={{ submitStep, values }}>
                {children}
              </Context.Provider>
            </div>
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
  );
}
