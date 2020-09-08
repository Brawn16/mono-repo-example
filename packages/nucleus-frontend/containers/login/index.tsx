import Router from "next/router";
import React from "react";
import { Head } from "../../components/head";
import { Login as LoginForm } from "../../components/login";
import { SplitScreen } from "../../layouts/split-screen";

export function Login() {
  return (
    <>
      <Head title="Login" />
      <SplitScreen>
        <h1 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
          Login
        </h1>
        <LoginForm onSuccess={() => Router.push("/dashboard/")} />
      </SplitScreen>
    </>
  );
}
