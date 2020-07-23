export interface WorkPack {
  jobReference: string;
  projectReference: string;
  workTypeName: string;
  popAreaName: string;
  cityName: string;
  jobStatusName: string;
  projectStatusName: string;
  contractorName: string;
  projectManagerName: string;
  baselineStartDate: string;
  requiredByDate: string;
}

export interface WorkPacksData {
  workPacks: WorkPack[];
}
