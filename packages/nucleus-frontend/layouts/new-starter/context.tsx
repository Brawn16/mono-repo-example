import { createContext } from "react";
import { NewStarterFormContext } from "./types";

export const Context = createContext<NewStarterFormContext>({
  submitStep: () => {
    //
  },
  values: {}
});
