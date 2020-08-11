import filter from "lodash/filter";
import React, { createContext, useState } from "react";
import { steps } from "../containers/new-starter/steps";
import { saveToLocal } from "../helpers/helper";

export interface FormContext {
  formValues?: any;
  setFormData?: (name: string, data: any) => void;
  children: any;
  completedSteps?: any;
}
export const Context = createContext<FormContext | any>({});

const formNames = [
  "personalDetails",
  "addressDetails",
  "workDetails",
  "qualifications",
  "identification",
  "myPhoto",
  "medical",
  "summary",
];

export const ContextProvider = (props: any) => {
  const [formValues, setFormValues] = useState({});

  const setFormData = (name: string, data: any) => {
    setFormValues({
      ...formValues,
      [name]: data,
    });
    saveToLocal(name, data);
  };

  const updateStoreWithFormData = () => {
    // sets the global state with local storage

    const newDataObject: any = {};
    formNames.forEach((formName) => {
      const formData = localStorage.getItem(formName);

      if (formData) {
        newDataObject[formName] = formData;
      }
    });
    setFormValues(newDataObject);
  };

  const stepsCompleted = (route: string) => {
    const formValueKeys = Object.keys(formValues);

    // finds cuurent active page
    const currentStep = filter(steps, (step) => {
      return step.href === route && step.href !== "/new-starter";
    });

    // finds completed steps
    const currentSteps = formValueKeys.map((formValue) => {
      if (formValueKeys.includes(formValue)) {
        return steps[formValue];
      }
    });

    const stepsArray = [
      {
        href: "/new-starter",
        label: "Preparation",
      },
      ...currentSteps,
    ];
    if (currentStep[0]) {
      stepsArray.push(currentStep[0]);
    }
    // remove duplicates created by using the always using current step
    return stepsArray.filter((v: any, i: any) => stepsArray.indexOf(v) === i);
  };

  const { children } = props;
  return (
    <Context.Provider
      value={{
        setFormData,
        formValues,
        updateStoreWithFormData,
        stepsCompleted,
      }}
    >
      {children}
    </Context.Provider>
  );
};
