import { useQuery, useMutation } from "@apollo/client";
import { Alert } from "@sdh-project-services/nucleus-ui/dist/alert";
import { UploadViewer } from "@sdh-project-services/nucleus-ui/dist/upload-viewer";
import Router from "next/router";
import React, { FormEvent, useContext } from "react";
import { Context } from "../../../layouts/new-starter/context";
import { Navigation } from "../../../layouts/new-starter/navigation";
import {
  subcontractors as subcontractorsQuery,
  workstreams as workstreamsQuery,
} from "../work-details/queries.gql";
import { square } from "./form.module.css";
import { createOperative as createOperativeMutation } from "./mutations.gql";
import { Panel } from "./panel";

function findValue(data: any = [], id: string) {
  const value = data.find((record: any) => record.id === id) || {};
  return value.name;
}

function renderField(label: string, value?: string) {
  return (
    <div className="py-1 grid grid-cols-2 gap-4">
      <strong className="truncate font-montserrats">{label}</strong>
      <div className="text-gray-400 truncate font-montserrats">{value}</div>
    </div>
  );
}

function renderAddress(values: { [key: string]: any }) {
  const desiredAddressFields: any = {
    addressLine1: "Address Line 1",
    addressLine2: "Address Line 2",
    addressLine3: "Address Line 3",
    addressTownCity: "Town/City",
    addressCounty: "County",
    addressPostcode: "Postcode",
  };
  return Object.keys(desiredAddressFields)
    .filter((value) => values[value])
    .map((addressValue) => {
      return renderField(
        desiredAddressFields[addressValue],
        values[addressValue]
      );
    });
}

export function Form() {
  const { data: subcontractorsData = {} }: any = useQuery(subcontractorsQuery);
  const { data: workstreamsData = {} }: any = useQuery(workstreamsQuery);
  const { values } = useContext(Context);
  const { identifications = [], qualificationUploadIds = [] } = values;
  const [createOperative, { error }] = useMutation(createOperativeMutation, {
    errorPolicy: "all",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      ...values,
      acceptedRequiredDocs: undefined,
      acceptedTermsConsent: undefined,
    };

    const { errors } = await createOperative({
      variables: { data },
    });

    if (errors === undefined) {
      Router.push("/new-starter/confirmation");
      localStorage.removeItem("new-starter");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert className="mb-8 text-white bg-red-600">{error.message}</Alert>
      )}
      <Panel href="/new-starter/personal-details" title="Personal Details">
        {renderField("First Name", values.firstName)}
        {renderField("Last Name", values.lastName)}
        {renderField("Email", values.email)}
        {renderField("Phone Number", values.phoneNumber)}
        {renderField("Emergency Contact Name", values.emergencyContactName)}
        {renderField(
          "Emergency Contact Phone Number",
          values.emegencyContactPhoneNumber
        )}
      </Panel>
      <Panel className="mt-8" href="/new-starter/address" title="Address">
        {renderAddress(values)}
      </Panel>
      <Panel
        className="mt-8"
        href="/new-starter/identification"
        title="Identification"
      >
        {renderField(
          "Identification",
          identifications[0] && identifications[0].type
        )}
        {renderField(
          "Proof of Address",
          identifications[1] && identifications[1].type
        )}
      </Panel>
      <Panel
        className="mt-8"
        href="/new-starter/work-details"
        title="Work Details"
      >
        {renderField(
          "Who will you be working for?",
          findValue(workstreamsData.workstreams, values.workstream)
        )}
        {renderField(
          "Which subcontractor do you work for?",
          findValue(subcontractorsData.subcontractors, values.subcontractor)
        )}
      </Panel>
      <Panel
        className="mt-8"
        href="/new-starter/qualifications"
        title="Qualifications"
      >
        <div className="grid grid-cols-2">
          <strong className="truncate">your uploaded files</strong>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {qualificationUploadIds.map((uploadId: string) => {
              return (
                <div>
                  <div className={square}>
                    <UploadViewer id={uploadId}>
                      {({ data = {} }) => (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            alt="Upload"
                            className="max-h-full"
                            src={data.presignedUrl}
                          />
                        </div>
                      )}
                    </UploadViewer>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Panel>
      <Panel className="mt-8" href="/new-starter/my-photo" title="My Photo">
        <div className="grid grid-cols-2 gap-4">
          <strong className="truncate">worker profile</strong>
          <div className="w-32">
            <div className={square}>
              <UploadViewer id={values.photoUpload}>
                {({ data = {} }) => (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      alt="Upload"
                      className="max-h-full"
                      src={data.presignedUrl}
                    />
                  </div>
                )}
              </UploadViewer>
            </div>
          </div>
        </div>
      </Panel>
      <Panel className="mt-8" href="/new-starter/medical" title="Medical">
        {renderField(
          "Medical issues or ailments",
          values.medicalIssues ? "Yes" : "No"
        )}
        {values.medicalIssues &&
          renderField("", `Details: ${values.medicalIssuesNotes}`)}
        {renderField("Medication", values.medicationRequired ? "Yes" : "No")}
        {values.medicationRequired &&
          renderField("", `Details: ${values.medicationRequiredNotes}`)}
      </Panel>
      <Navigation nextLabel="Submit" />
    </form>
  );
}
