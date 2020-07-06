import NextLink from "next/link";
import React from "react";
import { AnchorProps } from "./types";

export function Anchor(
  props: React.PropsWithChildren<AnchorProps>
): React.ReactElement {
  const {
    children,
    className = "text-blue-600 hover:text-blue-500",
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
