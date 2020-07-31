import React, { createContext, useState } from "react";
import { saveToLocal } from "../helpers/helper";

export interface FormContext {
  formValues?: any;
  setFormData?: (name: string, data: any) => void;
  children: any;
}
export const Context = createContext<FormContext | any>({});

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
    const formNames = ["personalDetails"];
    formNames.forEach((formName) => {
      const formData = localStorage.getItem(formName);
      if (formData) {
        setFormData(formName, JSON.parse(formData));
      }
    });
  };

  const { children } = props;
  return (
    <Context.Provider
      value={{ setFormData, formValues, updateStoreWithFormData }}
    >
      {children}
    </Context.Provider>
  );
};
