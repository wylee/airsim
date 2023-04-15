import http from "http";

import express from "express";

import { initRoutes } from "./routes";
import { initSocket } from "./socket";

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

initRoutes(app);
initSocket(server);

server.listen(port, () => {
  console.log("Server listening on port", port);
});
