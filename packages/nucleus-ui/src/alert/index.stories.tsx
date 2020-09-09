import React from "react";
import { AiOutlineQuestion } from "react-icons/ai";
import { Alert } from ".";

export default {
  component: Alert,
  title: "Alert",
};

export const alert = () => (
  <Alert>
    <strong>Basic alert</strong>
    <p>And a little bit of text...</p>
  </Alert>
);

export const customIcon = () => (
  <Alert iconType={AiOutlineQuestion}>
    <strong>Alert with custom icon</strong>
    <p>And a little bit of text...</p>
  </Alert>
);
