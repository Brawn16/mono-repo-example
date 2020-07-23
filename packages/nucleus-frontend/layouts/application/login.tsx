import React, { useState, useEffect } from "react";
import { Login as LoginForm } from "../../components/login";
import { login as loginClassName } from "./login.module.css";

export function Login(): React.ReactElement | null {
  const [render, setRender] = useState(false);

  // Delay render so the login doesn't flash while cookies are being parsed
  useEffect(() => {
    setRender(true);
  }, []);

  if (!render) {
    return null;
  }

  return (
    <div className={loginClassName}>
      <div className="w-full max-w-sm p-8 mx-auto bg-white">
        <LoginForm>
          <div className="text-center">
            <h2 className="text-2xl font-extrabold">
              Login <span className="hidden md:inline">to your account</span>
            </h2>
          </div>
        </LoginForm>
      </div>
    </div>
  );
}
