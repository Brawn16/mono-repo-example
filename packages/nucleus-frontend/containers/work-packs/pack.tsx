import React from "react";
import { WorkPack } from "./types";

function formatDate(date: string | null) {
  if (date === null) {
    return null;
  }

  // Don't judge me, just a quick method for POC!
  return date
    .slice(0, 10)
    .split("-")
    .reverse()
    .join("/");
}

export function Pack({ pack }: { pack: WorkPack }): React.ReactElement {
  return (
    <tr className="border-t border-gray-200 border-dashed">
      <td>
        <span className="flex items-center px-4 py-2">{pack.jobReference}</span>
      </td>
      <td>
        <span className="flex items-center px-4 py-2">
          {pack.projectReference}
        </span>
      </td>
      <td>
        <span className="flex items-center px-4 py-2">{pack.workTypeName}</span>
      </td>
      <td>
        <span className="flex items-center px-4 py-2">{pack.popAreaName}</span>
      </td>
      <td>
        <span className="flex items-center px-4 py-2">{pack.cityName}</span>
      </td>
      <td>
        <span className="flex items-center px-4 py-2">
          {pack.jobStatusName}
        </span>
      </td>
      <td>
        <span className="flex items-center px-4 py-2">
          {pack.projectStatusName}
        </span>
      </td>
      <td>
        <span className="flex items-center px-4 py-2">
          {pack.contractorName}
        </span>
      </td>
      <td>
        <span className="flex items-center px-4 py-2">
          {pack.projectManagerName}
        </span>
      </td>
      <td>
        <span className="flex items-center px-4 py-2">
          {formatDate(pack.baselineStartDate)}
        </span>
      </td>
      <td>
        <span className="flex items-center px-4 py-2">
          {formatDate(pack.requiredByDate)}
        </span>
      </td>
    </tr>
  );
}
