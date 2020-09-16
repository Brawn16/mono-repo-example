import { useRouter } from "next/router";
import React from "react";
import { Anchor } from "../../components/anchor";
import { NavLinkProps } from "./types";

export function NavLink({ href, label }: NavLinkProps) {
  const { asPath } = useRouter();
  let className = "text-blue-300 hover:bg-blue-700";

  // If the current route is a decent of the link, display as active
  if (asPath.startsWith(href)) {
    className = "bg-blue-900 text-white";
  }

  return (
    <Anchor
      className={`px-4 py-2 ml-2 rounded focus:text-white focus:bg-blue-700 hover:text-white ${className}`}
      href={href}
    >
      {label}
    </Anchor>
  );
}
