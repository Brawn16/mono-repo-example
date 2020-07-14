import React from "react";
import { Spinner } from ".";

export default {
  component: Spinner,
  title: "Spinner"
};

export const loadingSpinner = () => <Spinner color="#000" />;
