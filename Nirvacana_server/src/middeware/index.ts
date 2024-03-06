import * as express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import compression from "compression";
import { authenticate } from "./authenticate";
import rateLimiter from "./rateLimiter";
import { RequestWithUser } from "../types";

/**
 *
 * @param app, Express app listening for requests
 *
 * Function runs all middlewares for a single request that hits the server
 */
const runMiddlewaresForRequest = (app: express.Express) => {
  // Set server proxy
  app.set("trust proxy", true);

  // Body Parser Middleware
  app.use(bodyParser.json({ limit: "1mb" }));
  app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));

  // Cors Middleware
  app.use(cors({ origin: true }));

  // Helmet middleware
  app.use(helmet());

  // Compression middleware
  app.use(compression());

  // Rate Limiter Middleware
  app.use(rateLimiter);

  // Authenticate user
  app.use(
    (
      req: RequestWithUser,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      authenticate(req, res, next);
    },
  );
};

export default runMiddlewaresForRequest;
