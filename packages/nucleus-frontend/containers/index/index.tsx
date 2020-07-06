import Router from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export function Index(): null {
  const [{ token }] = useCookies();

  useEffect(() => {
    Router.push(token ? "/dashboard" : "/login");
  }, []);

  return null;
}
