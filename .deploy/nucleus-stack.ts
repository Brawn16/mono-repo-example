import { Construct, Stack } from "@aws-cdk/core";
import { sanitizeBranch } from "./utils";
import { NucleusBackend } from "./nucleus-backend";
import { NucleusFrontend } from "./nucleus-frontend";

export class NucleusStack extends Stack {
  public readonly nucleusBackend: NucleusBackend;
  public readonly nucleusFrontend: NucleusFrontend;

  constructor(scope: Construct, branch: string, protection: boolean) {
    const branchPascal = sanitizeBranch(branch);
    super(scope, `Nucleus${branchPascal}`, {
      description: `Stack for Nucleus (${branch})`,
      env: {
        account: "303003277076",
        region: "eu-west-1",
      },
      tags: {
        branch,
        project: "nucleus",
      },
      terminationProtection: protection,
    });

    this.nucleusBackend = new NucleusBackend(this, branch, protection);
    this.nucleusFrontend = new NucleusFrontend(this, branch, protection);
  }
}
