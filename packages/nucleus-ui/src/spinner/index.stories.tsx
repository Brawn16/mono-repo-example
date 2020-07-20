import React from "react";
import { Spinner } from ".";

export default {
  component: Spinner,
  title: "Spinner"
};

export const defualtSpinner = () => <Spinner />;

export const coloredSpinner = () => <Spinner color="blue" />;
