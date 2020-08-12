import {
  PrimaryButton,
  Button,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Fieldset } from "@sdh-project-services/nucleus-ui/dist/fieldset";
import React from "react";
import { Anchor } from "../../../components/anchor";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";

export function Summary(): React.ReactElement {
  interface FieldProps {
    label: string;
    value: string;
  }
  interface FieldsProps {
    label: string;
    values: string[];
  }

  const Field = (props: FieldProps) => {
    const { label, value } = props;
    return (
      <div className="flex justify-between">
        <p className="font-bold">{`${label}:`}</p>
        <p>{value}</p>
      </div>
    );
  };

  const Fields = (props: FieldsProps) => {
    const { label, values } = props;
    return (
      <div className="flex justify-between">
        <p className="font-bold">{`${label}:`}</p>
        <div>
          {values.map((value) => {
            return <p>{value}</p>;
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <Head title="New Starter Form" />
      <NewStarterLayout>
        <Fieldset>
          <Field label="Name" value="Nick" />
          <Field label="Email" value="nick@gmail.com" />
          <Field label="Phone Number" value="07777777777" />
          <Field label="Date Of Birth" value="12/12/2000" />
          <Field label="Emergency Contact Name" value="Fred" />
          <Field label="Emergency Contact Number" value="077777777777" />
          <div className="mt-4 text-right">
            <Anchor href="/new-starter/personal-details">
              <Button>Edit</Button>
            </Anchor>
          </div>
        </Fieldset>
        <Fieldset className="mt-4">
          <Field label="Address" value="28 Aura Court" />
          <div className="mt-4 text-right">
            <Anchor href="/new-starter/address">
              <Button>Edit</Button>
            </Anchor>
          </div>
        </Fieldset>
        <Fieldset className="mt-4">
          <Field label="Who You Work For" value="City Fibre" />
          <Field label="Sub-Contractor" value="Terry's Telecom" />
          <div className="mt-4 text-right">
            <Anchor href="/new-starter/work-details">
              <Button>Edit</Button>
            </Anchor>
          </div>
        </Fieldset>
        <Fieldset className="mt-4">
          <Fields
            label="Qualifications"
            values={["CPCS Blue", "A04 Tower Crane"]}
          />
          <div className="mt-4 text-right">
            <Anchor href="/new-starter/qualifications">
              <Button>Edit</Button>
            </Anchor>
          </div>
        </Fieldset>
        <Fieldset className="mt-4">
          <Field label="Identification 1" value="Uploaded" />
          <Field label="Identification 2" value="Uploaded" />
          <div className="mt-4 text-right">
            <Anchor href="/new-starter/identification">
              <Button>Edit</Button>
            </Anchor>
          </div>
        </Fieldset>
        <Fieldset className="mt-4">
          <Field label="My Photo" value="Uploaded" />
          <div className="mt-4 text-right">
            <Anchor href="/new-starter/my-photo">
              <Button>Edit</Button>
            </Anchor>
          </div>
        </Fieldset>
        <Fieldset className="mt-4">
          <Field label="Medical Issues" value="None" />
          <Field label="Medication" value="None" />
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
          <Anchor href="/new-starter/summary">
            <PrimaryButton>Continue</PrimaryButton>
          </Anchor>
        </div>
      </NewStarterLayout>
    </>
  );
}
