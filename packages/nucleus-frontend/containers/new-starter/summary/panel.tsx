import { Panel as BasePanel } from "@sdh-project-services/nucleus-ui/dist/panel";
import React, { PropsWithChildren } from "react";
import { FaEdit } from "react-icons/fa";
import { Anchor } from "../../../components/anchor";
import { PanelProps } from "./types";

export function Panel({
  children,
  className,
  href,
  title,
}: PropsWithChildren<PanelProps>) {
  return (
    <BasePanel className={className}>
      <div className="flex justify-between mb-4 font-montserrat">
        <h4 className="text-lg font-extrabold">{title}</h4>
        <Anchor
          className="flex items-center hover:text-gray-800 focus:outline-none duration-150 ease-in-out transition"
          href={href}
        >
          <FaEdit />
          <span className="pl-1 underline">Edit</span>
        </Anchor>
      </div>
      {children}
    </BasePanel>
  );
}
