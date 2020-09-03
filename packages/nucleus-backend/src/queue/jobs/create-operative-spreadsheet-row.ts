import { env } from "process";
import { OperativeEntity } from "../../shared/entity/operative.entity";
import { getMSGraphClient } from "../../shared/ms-graph/client";

export async function createOperativeSpreadsheetRow(operativeId: string) {
  const api = env.SERVICE_NEW_STARTER_MS_GRAPH_CREATE_API;
  if (api === undefined) {
    throw new Error("MS Graph row creation is not configured.");
  }

  const operative = await OperativeEntity.findOneOrFail(operativeId, {
    relations: ["subcontractor", "workstream"],
  });
  const { subcontractor, workstream } = operative;

  return getMSGraphClient()
    .api(api)
    .post({
      values: [
        [
          workstream ? workstream.name : undefined,
          subcontractor ? subcontractor.name : undefined,
          operative.firstName,
          operative.lastName,
          operative.email,
          operative.phoneNumber,
          operative.emergencyContactName,
          operative.emergencyContactPhoneNumber,
          operative.addressLine1,
          operative.addressLine2,
          operative.addressLine3,
          operative.addressTownCity,
          operative.addressCounty,
          operative.addressPostcode,
          operative.medicalIssues ? "Yes" : "No",
          operative.medicalIssuesNotes,
          operative.medicationRequired ? "Yes" : "No",
          operative.medicationRequiredNotes,
        ],
      ],
    });
}
