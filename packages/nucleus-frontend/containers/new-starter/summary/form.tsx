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
import { createOperative as createOperativeMutation } from "./mutations.gql";
import { Panel } from "./panel";

function findValue(data: any = [], id: string) {
  const value = data.find((record: any) => record.id === id) || {};
  return value.name;
}

function renderAddress(values: { [key: string]: any }) {
  return [
    values.addressLine1 || "",
    values.addressLine2 || "",
    values.addressLine3 || "",
    values.adressTownCity || "",
    values.addressCounty || "",
    values.addressPostcode || "",
  ]
    .filter((line) => line !== "")
    .join(", ");
}

function renderField(label: string, value?: string) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <strong>{label}</strong>
      <div>{value}</div>
    </div>
  );
}

export function Form() {
  const { data: subcontractorsData = {} }: any = useQuery(subcontractorsQuery);
  const { data: workstreamsData = {} }: any = useQuery(workstreamsQuery);
  const { values } = useContext(Context);
  const { identifications = [], qualificationUploadIds = [] } = values;
  const { length: qualificationsUploaded } = qualificationUploadIds;
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

  let qualificationsText = `${qualificationsUploaded} photo`;
  if (qualificationsUploaded !== 1) {
    qualificationsText += "s";
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert className="mb-8 text-white bg-red-600">{error.message}</Alert>
      )}
      <Panel href="/new-starter/personal-details" title="Personal Details">
        {renderField(
          "Name",
          `${values.firstName || ""} ${values.lastName || ""}`
        )}
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
        {qualificationsText} uploaded
      </Panel>
      <Panel className="mt-8" href="/new-starter/my-photo" title="My Photo">
        <UploadViewer id={values.photoUpload}>
          {({ data = {} }) => (
            <img alt="Upload" className="max-h-44" src={data.presignedUrl} />
          )}
        </UploadViewer>
      </Panel>
      <Panel className="mt-8" href="/new-starter/medical" title="Medical">
        {renderField(
          "Do you suffer from any medical issues or ailment?",
          values.medicalIssues ? "Yes" : "No"
        )}
        {values.medicalIssues &&
          renderField("Details of medical issues", values.medicalIssuesNotes)}
        {renderField(
          "Do you take any medication that could impair your ability to work?",
          values.medicationRequired ? "Yes" : "No"
        )}
        {values.medicationRequired &&
          renderField(
            "Details of medical issues",
            values.medicationRequiredNotes
          )}
      </Panel>
      <Navigation />
    </form>
  );
}
