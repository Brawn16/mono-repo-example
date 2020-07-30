import { paramCase, pascalCase } from "change-case";

export function sanitizeBranch(branch: string, useParamCase = false) {
  const branchId = branch.replace(/[^a-zA-Z0-9]/g, " ").replace(/  +/g, " ");

  if (useParamCase) {
    return paramCase(branchId);
  }

  return pascalCase(branchId);
}
