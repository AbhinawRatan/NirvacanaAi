// Import required modules
import express, { Express } from "express";
import runMiddlewaresForRequest from "./middeware/index";
import setupRouteHandlers from "./routers";

// Configure server port and app
const PORT = process.env.PORT || 8080;
const app: Express = express();

// Run all middlewares for single request hitting the server
runMiddlewaresForRequest(app);

// Setup route handlers for all route url request
setupRouteHandlers(app);

// Define a route to fetch artist data by ID
app.get('/users/:artistId', (req, res) => {
  // Get artistId from request parameters
  const artistId = req.params.artistId;
  
  // Use artistId to fetch artist data
  // Example: Fetch artist data from a database
  // const artistData = fetchArtistFromDatabase(artistId);
  // res.json(artistData);

  // Example response
  res.json({ artistId });
});

// SERVER
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

export default app;
