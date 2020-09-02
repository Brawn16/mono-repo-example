import React, { PropsWithChildren } from "react";
import { useCookies } from "react-cookie";
import { Login } from "./login";
import { Nav } from "./nav";

export function Application({ children }: PropsWithChildren<{}>) {
  const year = new Date().getFullYear();
  const [{ token }] = useCookies();

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Nav />
        <div className="flex flex-col flex-1 md:px-8">{children}</div>
        <footer className="p-8 text-xs text-center text-gray-600">
          &copy; {year}. All Rights Reserved.
        </footer>
      </div>
      {!token && <Login />}
    </>
  );
}
