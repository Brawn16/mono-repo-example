import { useRouter } from "next/router";
import React from "react";
import { Anchor } from "../../components/anchor";
import { NavLinkProps } from "./types";

export function NavLink({ href, label }: NavLinkProps): React.ReactElement {
  const { asPath } = useRouter();
  let className = "text-blue-200 hover:bg-blue-600";

  // If the current route is a decent of the link, display as active
  if (asPath.startsWith(href)) {
    className = "bg-blue-800 text-white";
  }

  return (
    <Anchor
      className={`px-4 py-2 ml-2 rounded focus:text-white focus:bg-blue-600 hover:text-white ${className}`}
      href={href}
    >
      {label}
    </Anchor>
  );
}
