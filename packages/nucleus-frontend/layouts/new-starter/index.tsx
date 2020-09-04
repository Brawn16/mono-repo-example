import { useRouter } from "next/router";
import React, { PropsWithChildren, useEffect } from "react";
import { FiCheck } from "react-icons/fi";
import { Anchor } from "../../components/anchor";
import { Context } from "./context";
import { background, logo } from "./index.module.css";
import { steps } from "./steps";
import { NewStarterFormData, NewStarterStep, NewStarterProps } from "./types";

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

function renderStep({ href, label }: NewStarterStep, index: number) {
  const { step: currentStep } = getLocalFormData();
  const { asPath } = useRouter();
  const active = steps[index].href === asPath;
  const activeStyle = active ? "bg-white text-blue-900" : "";

  const step = (
    <div className="relative flex items-center">
      <div
        className={`flex items-center justify-center w-10 h-10 text-xl font-bold border border-white border-opacity-25 rounded-full ${activeStyle}`}
      >
        {currentStep > index - 1 ? <FiCheck /> : index + 1}
        {label !== "Summary" && (
          <div className="absolute h-4 border-r border-white top-10 border-opacity-25" />
        )}
      </div>
      <div className="pl-3">{label}</div>
    </div>
  );

  // Render disabled step
  if (currentStep < index - 1) {
    return (
      <li key={href}>
        <div className="flex opacity-50 cursor-not-allowed">{step}</div>
      </li>
    );
  }

  // Parse anchor classes
  let className = "flex";
  if (asPath === href) {
    className += " font-extrabold text-xl";
  }

  return (
    <li key={href}>
      <Anchor className={className} href={href}>
        {step}
      </Anchor>
    </li>
  );
}

function renderSteps() {
  return (
    <div className="items-center flex-1 hidden mt-8 md:flex">
      <ul className="relative text-lg text-white space-y-4">
        {steps.map((step, index) => renderStep(step, index))}
      </ul>
    </div>
  );
}

export function NewStarter({
  children,
  header,
  headerTitle,
  showSteps = true,
  title,
}: PropsWithChildren<NewStarterProps>) {
  const { step: submittedStep, values } = getLocalFormData();
  const year = new Date().getFullYear();
  const router = useRouter();
  const { asPath } = router;
  const stepIndex = steps.findIndex((step) => step.href === asPath);
  const { href: backHref } = steps[stepIndex - 1] || {};

  useEffect(() => {
    // If we are on confirmation, do not check
    if (asPath === "/new-starter/confirmation") {
      return;
    }

    if (stepIndex > submittedStep + 1) {
      router.push(steps[submittedStep + 1].href);
    }
  }, []);

  const submitStep = (updatedValues: { [key: string]: string }) => {
    const data = getLocalFormData();
    if (stepIndex > data.step) {
      data.step = stepIndex;
    }

    data.values = { ...data.values, ...updatedValues };
    localStorage.setItem("new-starter", JSON.stringify(data));

    // Navigate to next step
    const { href } = steps[stepIndex + 1];
    router.push(href);
  };

  return (
    <div className="min-h-screen md:flex">
      <div className={background}>
        <div className={logo} />
        {showSteps && renderSteps()}
      </div>
      <div className="flex flex-col flex-1 max-h-screen">
        {showSteps && (
          <div className="px-8 py-4 bg-gray-200 border-b border-gray-300">
            <h1 className="text-xl font-extrabold text-gray-900 md:text-2xl font-montserrat">
              Register new starter
            </h1>
            <h2 className="text-xl text-gray-500">
              {`${stepIndex + 1} of ${steps.length}`}
              {(title && `: ${title}`) || ""}
            </h2>
          </div>
        )}
        <div className="flex flex-col flex-1 md:overflow-auto">
          <div className="flex-1 max-w-4xl p-8 pb-0">
            {backHref && (
              <Anchor className="block mb-4" href={backHref}>
                &lt; <span className="underline">Back</span>
              </Anchor>
            )}
            {header || (
              <h2 className="text-2xl font-extrabold md:text-3xl font-montserrat">
                {headerTitle || title}
              </h2>
            )}
            <div className="mt-8">
              <Context.Provider value={{ submitStep, values }}>
                {children}
              </Context.Provider>
            </div>
          </div>
          <footer className="p-8 text-xs text-gray-600">
            &copy; {year}. All Rights Reserved.
          </footer>
        </div>
      </div>
    </div>
  );
}
