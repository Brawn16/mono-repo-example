import NextHead from "next/head";
import React from "react";
import { HeadProps } from "./types";

export function Head({ title }: HeadProps) {
  return (
    <NextHead>
      <title>{title} - SDH Nucleus</title>
    </NextHead>
  );
}
