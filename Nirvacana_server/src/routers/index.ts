import { Express, Router } from "express";
import CONFIG from "../configs/config";
import authRouter from "./authRoutes";
import artistRouter from "./artistRouter";

// Declare route handler object
interface RouteHandler {
  router: Router;
  route: string;
}

// Declare all routes in server
const allRoutes: RouteHandler[] = [
  // Users
  {
    router: artistRouter,
    route: "/artists",
  },
  // Auth
  {
    router: authRouter,
    route: "/auth",
  },
];

const setupRouteHandlers = (app: Express) => {
  // Apply all routers to app
  allRoutes.forEach(({ router, route }: RouteHandler) => {
    // See more about the router details in the individual routeHandler route module, e.g usersRouter for /users
    app.use(`${CONFIG.API_ENDPOINT_URL}${route}`, router);
  });
};

export default setupRouteHandlers;
