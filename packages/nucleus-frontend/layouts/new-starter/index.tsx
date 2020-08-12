import { useRouter } from "next/router";
import React from "react";
import { Anchor } from "../../components/anchor";
import { Context } from "./context";
import { background, logo } from "./index.module.css";
import { steps } from "./steps";
import { NewStarterFormData, NewStarterStep } from "./types";

function getLocalFormData(): NewStarterFormData {
  if (typeof window === "object") {
    const form = localStorage.getItem("new-starter");
    if (form !== null) {
      return JSON.parse(form);
    }
  }

  return {
    step: -1,
    values: {}
  };
}

function renderMobileSteps() {
  const { asPath } = useRouter();
  const stepIndex = steps.findIndex(
    ({ href }: NewStarterStep) => href === asPath
  );
  const { label } = steps[stepIndex];

  return (
    <div className="flex items-center mb-8 text-xl text-gray-800 xl:hidden">
      <div className="flex items-center justify-center w-8 h-8 font-bold border border-blue-300 rounded-full">
        {stepIndex + 1}
      </div>
      <div className="mx-1">/</div>
      <div className="flex items-center justify-center w-8 h-8 font-bold border border-blue-300 rounded-full">
        {steps.length}
      </div>
      <div className="ml-2">{label}</div>
    </div>
  );
}

function renderStep({ href, label }: NewStarterStep, index: number) {
  const { step: currentStep } = getLocalFormData();
  const { asPath } = useRouter();
  const number = (
    <div className="flex items-center justify-center w-12 h-12 mr-4 text-2xl font-bold border border-blue-300 rounded-full">
      {index + 1}
    </div>
  );

  // Render disabled step
  if (currentStep < index - 1) {
    return (
      <li key={href} className="mb-4">
        <div className="flex items-center opacity-50 cursor-not-allowed">
          {number}
          {label}
        </div>
      </li>
    );
  }

  // Parse anchor classes
  let className = "flex items-center";
  if (asPath === href) {
    className += " font-extrabold";
  }

  return (
    <li key={href} className="mb-4">
      <Anchor className={className} href={href}>
        {number}
        {label}
      </Anchor>
    </li>
  );
}

function renderSteps() {
  return (
    <ul className="relative hidden m-16 text-lg text-white xl:block">
      {steps.map((step, index) => renderStep(step, index))}
    </ul>
  );
}

export function NewStarter({
  children
}: React.PropsWithChildren<{}>): React.ReactElement {
  const { values } = getLocalFormData();
  const year = new Date().getFullYear();
  const router = useRouter();

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
    router.push(href);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex w-full max-w-6xl">
        <div className="flex flex-col justify-between w-full max-w-4xl p-8 mx-auto">
          <div>
            <h1 className="pb-2 text-2xl font-extrabold text-gray-900 border-b border-gray-200 md:mt-8 md:text-3xl">
              <span className="hidden md:inline">Register</span> New Starter
            </h1>
            <div className="mt-8">
              {renderMobileSteps()}
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
        {renderSteps()}
      </div>
    </div>
  );
}
