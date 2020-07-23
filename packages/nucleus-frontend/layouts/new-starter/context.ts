import { createContext } from "react";

const context = createContext({});

export const { Consumer: DataConsumer } = context;

export const { Provider: DataProvider } = context;
