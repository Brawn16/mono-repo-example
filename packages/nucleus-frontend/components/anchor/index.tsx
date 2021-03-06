import NextLink from "next/link";
import React, { PropsWithChildren } from "react";
import { AnchorProps } from "./types";

export function Anchor(props: PropsWithChildren<AnchorProps>) {
  const {
    children,
    className = "text-blue-600 hover:text-blue-500 focus:text-blue-500 underline",
    href,
  } = props;

  return (
    <NextLink href={href}>
      <a
        {...props}
        className={`font-medium focus:outline-none duration-150 ease-in-out transition ${className}`}
      >
        {children}
      </a>
    </NextLink>
  );
}
