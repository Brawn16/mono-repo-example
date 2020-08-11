import { Accordion } from "@sdh-project-services/nucleus-ui/dist/accordion";
import { DatePicker } from "@sdh-project-services/nucleus-ui/dist/date-picker";
import { Input } from "@sdh-project-services/nucleus-ui/dist/input";
import { Upload } from "@sdh-project-services/nucleus-ui/dist/upload";
import React from "react";
import { FaTrash } from "react-icons/fa";

const handleChange = ([id]: string[]) => {
  /* eslint-disable-next-line no-console */
  console.log(id);
};

export function Qualification(): React.ReactElement {
  const headerChildren = (
    <button className="mr-2" type="button">
      <FaTrash />
    </button>
  );

  return (
    <Accordion
      headerChildren={headerChildren}
      isOpen
      title="CSCS - Blue - Skilled Worker"
    >
      <div className="flex">
        <div className="w-1/2 pr-4">
          <Input label="Card Number" name="number" />
        </div>
        <div className="w-1/2 pl-4">
          <DatePicker label="Card Expiry" name="expiry" />
        </div>
      </div>
      <div className="flex mt-4">
        <div className="w-1/2 pr-4">
          <Upload
            label="Photos"
            multiple
            onChange={handleChange}
            tags={["card"]}
          />
        </div>
      </div>
    </Accordion>
  );
}
