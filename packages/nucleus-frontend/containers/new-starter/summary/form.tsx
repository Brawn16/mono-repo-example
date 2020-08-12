import { useQuery } from "@apollo/client";
import {
  PrimaryButton,
  Button
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Fieldset } from "@sdh-project-services/nucleus-ui/dist/fieldset";
import { UploadViewer } from "@sdh-project-services/nucleus-ui/dist/upload-viewer";
import React, { useContext } from "react";
import { Anchor } from "../../../components/anchor";
import { Context } from "../../../layouts/new-starter/context";
import {
  subcontractors as subcontractorsQuery,
  workstreams as workstreamsQuery
} from "../work-details/queries.gql";
import { Field } from "./field";
import { Fields } from "./fields";

const findWorkstreamValue = (workValues: any, id: string) => {
  if (workValues) {
    const value =
      workValues.workstreams.find((workValue: any) => workValue.id === id) ||
      {};
    return value.name;
  }
};

const findSubcontractorValue = (workValues: any, id: string) => {
  if (workValues) {
    const value =
      workValues.subcontractors.find((workValue: any) => workValue.id === id) ||
      {};
    return value.name;
  }
};

export function Form(): React.ReactElement {
  const { values } = useContext(Context);
  const { data: subcontractorsData }: any = useQuery(subcontractorsQuery);
  const { data: workstreamsData }: any = useQuery(workstreamsQuery);

  return (
    <>
      <Fieldset>
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
        <div className="mt-4 text-right">
          <Anchor href="/new-starter/personal-details">
            <Button>Edit</Button>
          </Anchor>
        </div>
      </Fieldset>
      <Fieldset className="mt-4">
        <Fields
          label="Address"
          values={[values.addressLine1, values.addressPostcode]}
        />
        <div className="mt-4 text-right">
          <Anchor href="/new-starter/address">
            <Button>Edit</Button>
          </Anchor>
        </div>
      </Fieldset>
      <Fieldset className="mt-4">
        <Field
          label="Workstream"
          value={findWorkstreamValue(workstreamsData, values.workstream)}
        />
        <Field
          label="Sub-Contractor"
          value={findSubcontractorValue(
            subcontractorsData,
            values.subcontractor
          )}
        />
        <div className="mt-4 text-right">
          <Anchor href="/new-starter/work-details">
            <Button>Edit</Button>
          </Anchor>
        </div>
      </Fieldset>
      <Fieldset className="mt-4">
        <Field
          label="Qualifications"
          value={`${values.qualificationPhotoIds &&
            values.qualificationPhotoIds.length} Qualifications Uploaded`}
        />
        <div className="mt-4 text-right">
          <Anchor href="/new-starter/qualifications">
            <Button>Edit</Button>
          </Anchor>
        </div>
      </Fieldset>
      <Fieldset className="mt-4">
        <Field
          label="Identification 1"
          value={values.identification && values.identification[0].type}
        />
        <Field
          label="Identification 2"
          value={values.identification && values.identification[1].type}
        />
        <div className="mt-4 text-right">
          <Anchor href="/new-starter/identification">
            <Button>Edit</Button>
          </Anchor>
        </div>
      </Fieldset>
      <Fieldset className="mt-4">
        <Field label="My Photo" value="" />
        {values.photoId && (
          <div className="float-right">
            <UploadViewer id={values.photoId}>
              {({ url }) => (
                <img alt="Profile" className="block max-w-xs" src={url} />
              )}
            </UploadViewer>
          </div>
        )}
        <div className="clearfix" />
        <div className="mt-4 text-right">
          <Anchor href="/new-starter/my-photo">
            <Button>Edit</Button>
          </Anchor>
        </div>
      </Fieldset>
      <Fieldset className="mt-4">
        <Field
          label="Do you suffer from any medical issues or ailment"
          value={values.medicalIssues === false ? "No" : "Yes"}
        />
        {values.medicalIssues === true && (
          <Field
            label="Details of medical Issues"
            value={values.medicalIssuesNotes}
          />
        )}
        <Field
          label="Do you take any medication that could impair your ability to work"
          value={values.medicationRequired === false ? "No" : "Yes"}
        />
        {values.medicationRequired === true && (
          <Field
            label="Details of medication"
            value={values.medicationRequiredNotes}
          />
        )}
        <div className="mt-4 text-right">
          <Anchor href="/new-starter/medical">
            <Button>Edit</Button>
          </Anchor>
        </div>
      </Fieldset>
      <div className="flex justify-between mt-8">
        <Anchor href="/new-starter/medical">
          <Button>Back</Button>
        </Anchor>
        <Anchor href="/new-starter/confirmation">
          <PrimaryButton>Continue</PrimaryButton>
        </Anchor>
      </div>
    </>
  );
}
