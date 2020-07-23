import { Steps } from "@sdh-project-services/nucleus-ui/dist/steps";
import { useRouter } from "next/router";
import React from "react";
import { DataProvider } from "./context";

const steps = [
  {
    href: "/new-starter",
    label: "Preparation"
  },
  {
    href: "/new-starter/personal-details",
    label: "Personal Details"
  },
  {
    href: "/new-starter/address",
    label: "Address"
  },
  {
    href: "/new-starter/work-details",
    label: "Work Details"
  },
  {
    href: "/new-starter/qualifications",
    label: "Qualifications"
  },
  {
    href: "/new-starter/identification",
    label: "Identification"
  },
  {
    href: "/new-starter/medical-questionnaire",
    label: "Medical Questionnaire"
  },
  {
    href: "/new-starter/summary",
    label: "Summary"
  }
];

export function NewStarter({
  children
}: React.PropsWithChildren<{}>): React.ReactElement {
  const { route } = useRouter();
  const year = new Date().getFullYear();

  // Find step with matching route
  const { label: active } = steps.find(({ href }) => href === route) || {};

  return (
    <DataProvider value={{}}>
      <div className="flex flex-col min-h-screen">
        <header className="py-4 bg-black">
          <div className="max-w-4xl mx-auto">
            <img alt="Nucleus" className="h-4" src="/logo.svg" />
          </div>
        </header>
        <main className="flex-1 w-full max-w-4xl mx-auto">
          <h1 className="py-4 text-2xl font-light text-center uppercase">
            New Starter Form
          </h1>
          <Steps active={active} steps={steps} />
          <div className="pt-8">{children}</div>
        </main>
        <footer className="p-8 text-xs text-center text-gray-400">
          &copy; {year}. All Rights Reserved.
        </footer>
      </div>
    </DataProvider>
  );
}
