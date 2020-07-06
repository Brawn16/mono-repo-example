import { DetailedHTMLProps, AnchorHTMLAttributes } from "react";

export interface AnchorProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  href: string;
}
