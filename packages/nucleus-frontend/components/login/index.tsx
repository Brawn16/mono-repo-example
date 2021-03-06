import { useMutation } from "@apollo/client";
import { Alert } from "@sdh-project-services/nucleus-ui/dist/alert";
import { PrimaryButton } from "@sdh-project-services/nucleus-ui/dist/button";
import { Checkbox } from "@sdh-project-services/nucleus-ui/dist/checkbox";
import { Input } from "@sdh-project-services/nucleus-ui/dist/input";
import filterObject from "filter-obj";
import React, { PropsWithChildren, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { AiOutlineLock } from "react-icons/ai";
import { Anchor } from "../anchor";
import { login as loginMutation } from "./mutations.gql";
import { LoginFormData, LoginProps } from "./types";

export function Login({
  children,
  onSuccess = () => {},
}: PropsWithChildren<LoginProps>) {
  const { errors, getValues, handleSubmit, register } = useForm<
    LoginFormData
  >();
  const [{ remember }, setCookie, removeCookie] = useCookies();
  const [login, { data, error }] = useMutation(loginMutation, {
    errorPolicy: "all",
  });

  const onSubmit = (formData: LoginFormData) => {
    login({
      variables: filterObject(formData, ["email", "password"]),
    });
  };

  useEffect(() => {
    // If we do not have a valid token, do not process
    const token = data?.login?.token;
    if (!token) {
      return;
    }

    setCookie("token", token);
    if (getValues("remember")) {
      setCookie("remember", getValues("email"));
    } else {
      removeCookie("remember");
    }

    onSuccess();
  }, [data]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {children}
      {error && (
        <Alert className="mt-8 text-white bg-red-600">{error.message}</Alert>
      )}
      <Input
        autoComplete="email"
        className="mt-8"
        componentRef={register({
          pattern: {
            message: "Invalid email address",
            value: /^[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,5}$/i,
          },
          required: "Email is required",
        })}
        defaultValue={remember}
        error={errors.email}
        label="Email Address"
        name="email"
        required
        type="email"
      />
      <Input
        autoComplete="current-password"
        className="mt-4"
        componentRef={register({ required: "Password is required" })}
        error={errors.password}
        label="Password"
        name="password"
        required
        type="password"
      />
      <div className="flex items-center justify-between mt-4 mb-8">
        <Checkbox
          componentRef={register}
          defaultChecked
          label="Remember Me"
          name="remember"
        />
        <Anchor href="/reset-password/">Forgot Password?</Anchor>
      </div>
      <PrimaryButton className="w-full" iconType={AiOutlineLock} type="submit">
        Login
      </PrimaryButton>
    </form>
  );
}
