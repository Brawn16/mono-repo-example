import { pascalCase } from "change-case";

export function sanitizeBranch(branch: string) {
  const branchId = branch.replace(/[^a-zA-Z0-9]/g, " ").replace(/  +/g, " ");
  return pascalCase(branchId);
}
