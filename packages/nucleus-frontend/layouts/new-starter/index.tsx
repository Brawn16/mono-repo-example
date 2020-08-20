import { useRouter } from "next/router";
import React from "react";
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

  const stepIndex = steps.findIndex((step) => step.href === asPath);
  const activePath = index < stepIndex;

  const number = (
    <div className="flex flex-col align-center">
      <div>
        <div
          className={`flex items-center justify-center w-8 h-8 text-xl ${
            active || activePath ? "bg-white text-blue-900" : ""
          } font-bold border border-blue-300 rounded-full`}
        >
          <div>
            {activePath ? <FiCheck className="font-bold" /> : index + 1}
          </div>
        </div>
      </div>

      <div
        className={`h-5 border-r-2 ${
          activePath ? "" : "border-blue-400 border-opacity-50"
        } w-1/2 ${index === 8 ? "border-none" : ""}`}
      />
    </div>
  );

  // Render disabled step
  if (currentStep < index - 1) {
    return (
      <li key={href}>
        <div className="flex opacity-50 cursor-not-allowed">
          {number}
          <div className="pl-3 whitespace-no-wrap">{label}</div>
        </div>
      </li>
    );
  }

  // Parse anchor classes
  let className = "flex";
  if (asPath === href) {
    className += " font-extrabold";
  }

  return (
    <li key={href}>
      <Anchor className={className} href={href}>
        {number}
        <div className="pl-3 whitespace-no-wrap"> {label}</div>
      </Anchor>
    </li>
  );
}

function renderSteps() {
  return (
    <ul className="sticky hidden mx-16 text-lg text-white lg:block inset-y-52 ">
      {steps.map((step, index) => renderStep(step, index))}
    </ul>
  );
}

export function NewStarter({
  children,
  showSteps = true,
  title,
}: React.PropsWithChildren<NewStarterProps>): React.ReactElement {
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
  const { asPath } = useRouter();
  const stepIndex = steps.findIndex((step) => {
    return step.href === asPath;
  });

  return (
    <div className="flex flex-col min-h-screen lg:flex-row">
      <div className={background}>
        <div className={logo} />
        {showSteps && renderSteps()}
      </div>
      <div className="flex w-full max-w-6xl border">
        <div className="flex flex-col  w-full mx-auto">
          <div className="px-10 py-2 bg-gray-200">
            <h1 className="font-extrabold text-gray-900 border-b border-gray-200 text-md md:text-2xl">
              Register new starter
            </h1>
            <div className="text-sm text-gray-500 md:text-xl">
              {`${stepIndex + 1} of ${steps.length}`}
              {(title && `: ${title}`) || ""}
            </div>
          </div>
          <div>
            <div className="px-10">
              <Context.Provider value={{ submitStep, values }}>
                {children}
              </Context.Provider>
            </div>
          </div>
          <footer className="px-10 mt-8 text-xs text-gray-400">
            &copy; {year}. All Rights Reserved.
          </footer>
        </div>
      </div>
    </div>
  );
}
