import { useQuery } from "@apollo/client";
import React from "react";
import { ClipLoader } from "react-spinners";
import { Head } from "../../components/head";
import { Application } from "../../layouts/application";
import { Pack } from "./pack";
import { workPacks as workPacksQuery } from "./queries.gql";
import { WorkPack, WorkPacksData } from "./types";

function renderLoading() {
  return (
    <tr>
      <td className="py-8 text-center" colSpan={11}>
        <ClipLoader size={64} />
      </td>
    </tr>
  );
}

function renderPacks(packs: WorkPack[]) {
  return packs.map((pack) => <Pack key={pack.jobReference} pack={pack} />);
}

export function WorkPacks(): React.ReactElement {
  const { data, loading } = useQuery<WorkPacksData>(workPacksQuery, {
    errorPolicy: "all",
  });

  return (
    <>
      <Head title="Work Packs" />
      <Application>
        <div className="bg-white rounded-md shadow-sm md:mt-8">
          <div className="overflow-auto">
            <table className="w-full text-left whitespace-no-wrap table-auto table-striped">
              <thead>
                <tr className="text-xs font-bold tracking-wider text-gray-600 uppercase border-b border-gray-200">
                  <th className="px-4 py-2">Work Pack</th>
                  <th className="px-4 py-2">Project Ref</th>
                  <th className="px-4 py-2">Package Type</th>
                  <th className="px-4 py-2">FEX Area</th>
                  <th className="px-4 py-2">City</th>
                  <th className="px-4 py-2">Package Status</th>
                  <th className="px-4 py-2">Primary Note Status</th>
                  <th className="px-4 py-2">Contractor</th>
                  <th className="px-4 py-2">Project Manager</th>
                  <th className="px-4 py-2">Baseline Start Date</th>
                  <th className="px-4 py-2">RBD</th>
                </tr>
              </thead>
              <tbody>
                {loading && renderLoading()}
                {data && renderPacks(data.workPacks)}
              </tbody>
            </table>
          </div>
        </div>
      </Application>
    </>
  );
}
