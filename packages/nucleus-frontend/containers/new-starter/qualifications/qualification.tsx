import { Accordion } from "@sdh-project-services/nucleus-ui/dist/accordion";
import { SecondaryButton } from "@sdh-project-services/nucleus-ui/dist/button";
import { DatePicker } from "@sdh-project-services/nucleus-ui/dist/date-picker";
import { Input } from "@sdh-project-services/nucleus-ui/dist/input";
import { Upload } from "@sdh-project-services/nucleus-ui/dist/upload";
import React from "react";
import { FaTrash } from "react-icons/fa";

export function Qualification(): React.ReactElement {
  const handleChange = ([id]: string[]) => {
    console.log(id);
  };

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
            label="Front"
            onChange={handleChange}
            tags={["card", "card-front"]}
          />
        </div>
        <div className="w-1/2 pl-4">
          <Upload
            label="Back"
            onChange={handleChange}
            tags={["card", "card-back"]}
          />
        </div>
      </div>
      <h3 className="mt-4 font-extrabold text-gray-900">Accreditations</h3>
      <div className="flex items-center mt-4 text-blue-800 bg-blue-50">
        <div className="w-2/3 px-4">Shovelman</div>
        <div className="w-1/3 pl-4">
          <DatePicker name="expiry" />
        </div>
      </div>
      <div className="flex items-center mt-2 text-blue-800 bg-blue-50">
        <div className="w-2/3 px-4">Shovelman</div>
        <div className="w-1/3 pl-4">
          <DatePicker name="expiry" />
        </div>
      </div>
    </Accordion>
  );
}
