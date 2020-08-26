import { useQuery, useMutation } from "@apollo/client";
import { Alert } from "@sdh-project-services/nucleus-ui/dist/alert";
import {
  PrimaryButton,
  Button,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Fieldset } from "@sdh-project-services/nucleus-ui/dist/fieldset";
import { UploadViewer } from "@sdh-project-services/nucleus-ui/dist/upload-viewer";
import React, { useContext } from "react";
import { Anchor } from "../../../components/anchor";
import { Context } from "../../../layouts/new-starter/context";
import {
  subcontractors as subcontractorsQuery,
  workstreams as workstreamsQuery,
} from "../work-details/queries.gql";
import { Field } from "./field";
import { Fields } from "./fields";
import { createOperative as createOperativeMutation } from "./mutations.gql";

function findValue(data: any = [], id: string) {
  const value = data.find((record: any) => record.id === id) || {};
  return value.name;
}

export function Form(): React.ReactElement {
  const { data: subcontractorsData = {} }: any = useQuery(subcontractorsQuery);
  const { data: workstreamsData = {} }: any = useQuery(workstreamsQuery);
  const { values } = useContext(Context);
  const { identifications = [], qualificationUploadIds = [] } = values;
  const { length: qualificationsUploaded } = qualificationUploadIds;
  const [createOperative, { error }] = useMutation(createOperativeMutation, {
    errorPolicy: "all",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { errors } = await createOperative({
      variables: { data: values },
    });

    if (errors === undefined) {
      // Router.push("/new-starter/confirmation");
      // localStorage.removeItem("new-starter");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert className="mb-8 text-white bg-red-600">{error.message}</Alert>
      )}
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
          value={findValue(workstreamsData.workstreams, values.workstream)}
        />
        <Field
          label="Subcontractor"
          value={findValue(
            subcontractorsData.subcontractors,
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
          value={`${qualificationsUploaded} Photos Uploaded`}
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
          value={identifications[0] && identifications[0].type}
        />
        <Field
          label="Identification 2"
          value={identifications[1] && identifications[1].type}
        />
        <div className="mt-4 text-right">
          <Anchor href="/new-starter/identification">
            <Button>Edit</Button>
          </Anchor>
        </div>
      </Fieldset>
      <Fieldset className="mt-4">
        <Field label="My Photo" value="" />
        {values.photoUpload && (
          <div className="float-right">
            <UploadViewer id={values.photoUpload}>
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
        <PrimaryButton>Submit</PrimaryButton>
      </div>
    </form>
  );
}
