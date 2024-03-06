import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createSplAssociatedTokenProgram,
  createSplTokenProgram,
} from "@metaplex-foundation/mpl-toolbox";
import { keypairIdentity } from "@metaplex-foundation/umi";
import { secretsClient } from "../../configs/firebase";

export const createUmiHelper = async (
  rpcUrl: string,
  walletSecretString?: string,
) => {
  const umi = createUmi(rpcUrl);

  umi.programs.add(createSplAssociatedTokenProgram());
  umi.programs.add(createSplTokenProgram());

  if (walletSecretString) {
    const [version] = await secretsClient.accessSecretVersion({
      name: walletSecretString,
    });
    const secret = version.payload?.data?.toString();

    if (!secret) {
      throw new Error("No secret found");
    }

    const kp = umi.eddsa.createKeypairFromSecretKey(
      Uint8Array.from(JSON.parse(secret)),
    );

    umi.use(keypairIdentity(kp));

    return { umi, kp };
  } else {
    return { umi };
  }
};
