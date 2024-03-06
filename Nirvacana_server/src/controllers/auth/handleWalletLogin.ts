import * as express from "express";
import { PublicKey, Transaction } from "@solana/web3.js";
import bs58 from "bs58";
import nacl from "tweetnacl";
import { RequestWithUser } from "../../types";
import * as admin from "firebase-admin";

const MEMO_PROGRAM_ID = new PublicKey(
  "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr",
);

export interface SigninMessage {
  domain: any;
  publicKey: any;
  nonce: any;
  statement: any;
}

async function getToken(publicKey: string) {
  try {
    const user = await admin.auth().getUser(publicKey);
    const idToken = await admin.auth().createCustomToken(user.uid);
    console.log("Token retrieved successfully");
    return idToken;
  } catch (error) {
    console.log("Error while getting token: ", error);
    if ((error as admin.FirebaseError).code === "auth/user-not-found") {
      // Create a new user if one does not exist
      const newUser = await admin.auth().createUser({
        uid: publicKey,
        // Add any other user properties you need
      });
      const idToken = await admin.auth().createCustomToken(newUser.uid);
      console.log("New user created and token retrieved successfully");
      return idToken;
    } else {
      // Handle other errors
      throw error;
    }
  }
}

export async function validateSigninMessage(
  signature: string,
  signinMessage: SigninMessage,
) {
  console.log("Validating signin message...");

  // Reconstruct the message format as used during signing on the client
  const msg = `${signinMessage.domain}:${signinMessage.publicKey}:${signinMessage.statement}:${signinMessage.nonce}`;
  console.log("Verifying message:", msg); // Log for debugging

  // Decode the signature and prepare the message for verification
  const signatureUint8 = bs58.decode(signature);
  const msgUint8 = new TextEncoder().encode(msg);
  const pubKeyUint8 = bs58.decode(signinMessage.publicKey);

  // Verify the signature
  const validationResult = nacl.sign.detached.verify(
    msgUint8,
    signatureUint8,
    pubKeyUint8,
  );
  console.log("Signin message validation result: ", validationResult);
  return validationResult;
}

export const handleWalletLogin = async (
  req: RequestWithUser,
  res: express.Response,
) => {
  console.log("Handling wallet login...");

  const {
    isLedger,
    signinMessage,
    signature: msgSignature,
    serializedTx: ledgerSerializedTx,
  }: {
    isLedger: boolean;
    signinMessage: SigninMessage;
    signature: string;
    serializedTx: any;
  } = req.body.data;

  let walletKey = "";

  if (isLedger) {
    const signedTx = Transaction.from(Uint8Array.from(ledgerSerializedTx));

    try {
      walletKey = signedTx.feePayer?.toBase58() || "";

      if (walletKey == "") {
        console.error("wallet is missing from sign transaction");
        return res
          .status(503)
          .json({ error: "wallet is missing from sign transaction" });
      }

      const inx = signedTx.instructions.find(
        (ix) => ix.programId.toBase58() == MEMO_PROGRAM_ID.toBase58(),
      );

      if (!inx) {
        console.error("Memo program id is invalid or does not matches");
        return res
          .status(503)
          .json({ error: "memo program id does not matches" });
      }

      // inx.data.toString() //signed message
      if (!signedTx.verifySignatures()) {
        console.error("failed to verify signature on transaction");
        return res
          .status(503)
          .json({ error: "failed to verify signature on transaction" });
      }
    } catch (error: any) {
      console.log("Error while handling ledger wallet login: ", error);
      return res.status(500).json({ error: error.message || error });
    }
  } else {
    walletKey = signinMessage.publicKey;

    if (!signinMessage) {
      return res.status(400).json({ error: "Invalid or missing parameters." });
    }

    try {
      const validationResult = await validateSigninMessage(
        msgSignature || "",
        signinMessage,
      );

      if (!validationResult) {
        throw new Error("Could not validate the signed message");
      }
    } catch (error: any) {
      console.log("Error while validating signin message: ", error);
      return res.status(500).json({ error: error.message || error });
    }
  }

  try {
    const token = await getToken(signinMessage.publicKey);
    console.log("Token retrieved successfully", token);
    return res.status(200).send({ token });
  } catch (error) {
    console.log("Error while adding wallet to user document: ", error);
    return res.status(500).send({ message: (error as Error).message });
  }
};
