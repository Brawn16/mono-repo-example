import { useQuery, useMutation } from "@apollo/client";
import { Alert } from "@sdh-project-services/nucleus-ui/dist/alert";
import {
  PrimaryButton,
  SecondaryButton,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Label } from "@sdh-project-services/nucleus-ui/dist/label";
import { Panel } from "@sdh-project-services/nucleus-ui/dist/panel";
import { UploadViewer } from "@sdh-project-services/nucleus-ui/dist/upload-viewer";
import Router from "next/router";
import React, { FormEvent, useContext } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { Anchor } from "../../../components/anchor";
import { Context } from "../../../layouts/new-starter/context";
import {
  subcontractors as subcontractorsQuery,
  workstreams as workstreamsQuery,
} from "../work-details/queries.gql";
import { Field } from "./field";
import { Fields } from "./fields";
import { createOperative as createOperativeMutation } from "./mutations.gql";
import { UploadGallery } from "@sdh-project-services/nucleus-ui/dist/upload-gallery";

function findValue(data: any = [], id: string) {
  const value = data.find((record: any) => record.id === id) || {};
  return value.name;
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

  const qualificationsText = `${qualificationsUploaded} Photo${
    qualificationsUploaded > 1 ? "s" : ""
  } Uploaded`;

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert className="mb-8 text-white bg-red-600">{error.message}</Alert>
      )}
      <Panel>
        <div className="flex justify-between mb-4 font-montserrat">
          <Label label="Personal Details" name="personalDetails" />
          <Anchor href="/new-starter/personal-details">
            <BsPencilSquare className="flex-shrink-0 text-2xl text-gray-400" />
          </Anchor>
        </div>

        <Field label="Name" value={`${values.firstName} ${values.lastName}`} />
        <Field label="Email" value={values.email} />
        <Field label="Phone Number" value={values.phoneNumber} />
        <Field
          label="Emergency Contact Name"
          value={values.emergencyContactName}
        />
        <Field
          label="Emergency Contact Number"
          value={values.emergencyContactNumber}
        />
      </Panel>
      <Panel className="mt-4">
        <div className="flex justify-between mb-4 font-montserrat">
          <Label label="Address" name="address" />
          <Anchor href="/new-starter/address">
            <BsPencilSquare className="flex-shrink-0 text-2xl text-gray-400" />
          </Anchor>
        </div>
        <Fields
          label="Address"
          values={[values.addressLine1, values.addressPostcode]}
        />
      </Panel>
      <Panel className="mt-4">
        <div className="flex justify-between mb-4 font-montserrat">
          <Label label="Identification" name="identification" />
          <Anchor href="/new-starter/identification">
            <BsPencilSquare className="flex-shrink-0 text-2xl text-gray-400" />
          </Anchor>
        </div>
        <Field
          label="Identification 1"
          value={identifications[0] && identifications[0].type}
        />
        <Field
          label="Identification 2"
          value={identifications[1] && identifications[1].type}
        />
      </Panel>
      <Panel className="mt-4">
        <div className="flex justify-between mb-4 font-montserrat">
          <Label label="Work details" name="workDetails" />
          <Anchor href="/new-starter/work-details">
            <BsPencilSquare className="flex-shrink-0 text-2xl text-gray-400" />
          </Anchor>
        </div>
        <Field
          label="Workstream"
          value={findValue(workstreamsData.workstreams, values.workstream)}
        />
        <Field
          label="Subcontractor"
          value={findValue(
            subcontractorsData.subcontractors,
            values.subcontractor
          )}
        />
      </Panel>
      <Panel className="mt-4">
        <div className="flex justify-between mb-4 font-montserrat">
          <Label label="Qualifications" name="qualifications" />
          <Anchor href="/new-starter/qualifications">
            <BsPencilSquare className="flex-shrink-0 text-2xl text-gray-400" />
          </Anchor>
        </div>
        <Field label="Qualifications" value={qualificationsText} />
      </Panel>

      <Panel className="mt-4">
        <div className="flex justify-between mb-4 font-montserrat">
          <Label label="My photo" name="myPhoto" />
          <Anchor href="/new-starter/my-photo">
            <BsPencilSquare className="flex-shrink-0 text-2xl text-gray-400" />
          </Anchor>
        </div>
        <div className="h-44">
          <UploadViewer id={values.photoUpload}>
            {({ data = {} }) => (
              <img
                alt="Upload"
                className="max-h-full"
                src={data.presignedUrl}
              />
            )}
          </UploadViewer>
        </div>

        <div className="clearfix" />
      </Panel>
      <Panel className="mt-4">
        <div className="flex justify-between mb-4›">
          <Label label="Medical" name="medical" />
          <Anchor href="/new-starter/medical">
            <BsPencilSquare className="flex-shrink-0 text-2xl text-gray-400" />
          </Anchor>
        </div>
        <Field
          label="Do you suffer from any medical issues or ailment?"
          value={values.medicalIssues ? "Yes" : "No"}
        />
        {values.medicalIssues && (
          <Field
            label="Details of medical Issues"
            value={values.medicalIssuesNotes}
          />
        )}
        <Field
          label="Do you take any medication that could impair your ability to work?"
          value={values.medicationRequired ? "Yes" : "No"}
        />
        {values.medicationRequired && (
          <Field
            label="Details of medication"
            value={values.medicationRequiredNotes}
          />
        )}
      </Panel>
      <div className="flex justify-between mt-8">
        <Anchor href="/new-starter/medical">
          <SecondaryButton>Back</SecondaryButton>
        </Anchor>
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </div>
    </form>
  );
}
