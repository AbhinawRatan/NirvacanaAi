import * as express from "express";
import * as admin from "firebase-admin";
import { RequestWithUser } from "../types";

// Middleware to validate JWT and set user
export const authenticate = async (
  req: RequestWithUser,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (req.path.includes("/admin")) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res
        .status(401)
        .send({ message: "Missing or invalid Authorization header" });
    }

    const token = header.split("Bearer ")[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);

      req.user = { uid: decodedToken.uid };
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).send({ message: "Invalid token" });
    }
  } else {
    next();
  }
};