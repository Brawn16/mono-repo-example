import React from "react";
import { FieldSetProps } from './types'


export function FieldSet({
    children,
    heading
  }: React.PropsWithChildren<FieldSetProps>) {
   return (
       <div>
           <p>{heading}</p>
                <div>{children}</div>
       </div>
   )
}