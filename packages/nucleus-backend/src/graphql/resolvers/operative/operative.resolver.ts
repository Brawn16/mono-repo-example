import { env } from "process";
import { IncomingWebhookResult } from "@slack/webhook";
import { plainToClass } from "class-transformer";
import { Arg, Mutation, Resolver } from "type-graphql";
import { IdentificationEntity } from "../../../shared/entity/identification.entity";
import { OperativeIdentificationEntity } from "../../../shared/entity/operative-identification.entity";
import { OperativeEntity } from "../../../shared/entity/operative.entity";
import { SubcontractorEntity } from "../../../shared/entity/subcontractor.entity";
import { WorkstreamEntity } from "../../../shared/entity/workstream.entity";
import { getMSGraphClient } from "../../../shared/ms-graph/get-ms-graph-client";
import { callSlackWebhook } from "../../../shared/slack/call-slack-webhook";
import { Public } from "../../decorators/public";
import { CreateOperativeIdentificationInput } from "./create-operative.identification.input";
import { CreateOperativeInput } from "./create-operative.input";

@Resolver()
export class OperativeResolver {
  @Mutation(() => OperativeEntity)
  @Public()
  public async createOperative(
    @Arg("data") data: CreateOperativeInput
  ): Promise<OperativeEntity> {
    const identification = await IdentificationEntity.findOneOrFail();
    const operative = plainToClass(OperativeEntity, data);
    const { identifications = [] } = data;

    // Save identification records
    operative.identifications = await Promise.all(
      identifications.map((input: CreateOperativeIdentificationInput) =>
        plainToClass(OperativeIdentificationEntity, {
          ...input,
          identification,
        }).save()
      )
    );

    // Save entity and trigger events
    await operative.save();
    await this.triggerCreateEvents(
      operative,
      data.workstream,
      data.subcontractor
    );

    return operative;
  }

  private async createSpreadsheetRow(
    operative: OperativeEntity,
    workstreamName?: string,
    subcontractorName?: string
  ) {
    const api = env.SERVICE_NEW_STARTER_MS_GRAPH_CREATE_API;
    if (api === undefined) {
      throw new Error("MS Graph row creation is not configured.");
    }

    return getMSGraphClient()
      .api(api)
      .post({
        values: [
          [
            workstreamName,
            subcontractorName,
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

  private async sendSlackNotification(
    operative: OperativeEntity,
    workstreamName?: string,
    subcontractorName?: string
  ): Promise<IncomingWebhookResult> {
    const { firstName = "", lastName = "" } = operative;

    return callSlackWebhook("SERVICE_NEW_STARTER_SLACK_WEBHOOK", {
      attachments: [
        {
          color: "#f7ac39",
          fields: [
            {
              short: true,
              title: "First Name",
              value: firstName,
            },
            {
              short: true,
              title: "Last Name",
              value: lastName,
            },
            {
              short: true,
              title: "Email",
              value: operative.email || "",
            },
            {
              short: true,
              title: "Phone Number",
              value: operative.phoneNumber || "",
            },
            {
              short: true,
              title: "Workstream",
              value: workstreamName || "",
            },
            {
              short: true,
              title: "Subcontractor",
              value: subcontractorName || "",
            },
          ],
        },
      ],
      blocks: [
        {
          type: "section",
          text: {
            text: `${firstName} ${lastName} has submitted a new registration.`,
            type: "plain_text",
          },
        },
        {
          type: "actions",
          elements: [
            {
              text: {
                type: "plain_text",
                text: "View Spreadsheet",
              },
              type: "button",
              url: env.SERVICE_NEW_STARTER_SPREADSHEET_URL,
            },
          ],
        },
      ],
      text: `${firstName} ${lastName} has submitted a new registration.`,
    });
  }

  private async triggerCreateEvents(
    operative: OperativeEntity,
    workstreamId?: string,
    subcontractorId?: string
  ) {
    const [
      { name: workstreamName },
      { name: subcontractorName },
    ] = await Promise.all([
      WorkstreamEntity.findOneOrFail(workstreamId),
      SubcontractorEntity.findOneOrFail(subcontractorId),
    ]);

    return Promise.all([
      this.createSpreadsheetRow(operative, workstreamName, subcontractorName),
      this.sendSlackNotification(operative, workstreamName, subcontractorName),
    ]);
  }
}
