import { env } from "process";
import { OperativeEntity } from "../../shared/entity/operative.entity";
import { callSlackWebhook } from "../../shared/slack/webhook";

export async function createOperativeTriggerSlackWebhook(operativeId: string) {
  const operative = await OperativeEntity.findOneOrFail(operativeId, {
    relations: ["subcontractor", "workstream"],
  });
  const { firstName, lastName, subcontractor, workstream } = operative;

  return callSlackWebhook("SERVICE_NEW_STARTER_SLACK_WEBHOOK", {
    attachments: [
      {
        color: "#f7ac39",
        fields: [
          {
            short: true,
            title: "First Name",
            value: firstName || "",
          },
          {
            short: true,
            title: "Last Name",
            value: lastName || "",
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
            value: workstream && workstream.name ? workstream.name : "",
          },
          {
            short: true,
            title: "Subcontractor",
            value:
              subcontractor && subcontractor.name ? subcontractor.name : "",
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
