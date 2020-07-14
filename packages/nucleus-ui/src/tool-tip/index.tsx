import React from 'react';
import {BsQuestionCircle} from 'react-icons/bs';
import ReactTooltip from "react-tooltip";

export const Tooltip = ()=> {
    
   return (
   <>
        <BsQuestionCircle data-effect='solid' data-tip="hello" />
        <ReactTooltip/>
   </>   
   )
}