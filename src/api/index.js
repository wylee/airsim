import fs from "fs/promises";
import http from "http";
import path from "path";

import express from "express";
import { Server } from "socket.io";

const env = process.env.NODE_ENV;
const is_prod = env === "production";
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const router = express.Router();
const assetsPath = path.join(path.resolve(), "src/ui/assets");
const distPath = path.join(path.resolve(), "dist");
const viewsPath = path.join(path.resolve(), "src/api/views");

const parseManifest = async () => {
  if (is_prod) {
    const manifestPath = path.join(path.resolve(), "dist", "manifest.json");
    const manifestFile = await fs.readFile(manifestPath);
    return JSON.parse(manifestFile);
  } else {
    return {};
  }
};

const io = new Server(server);

if (is_prod) {
  app.use("/assets", express.static(distPath));
} else {
  app.use("/assets", express.static(assetsPath));
}

app.set("view engine", "ejs");
app.set("views", viewsPath);

router.get("/*", async (_req, res) => {
  const data = {
    env,
    manifest: await parseManifest()
  };
  res.render("index.html.ejs", data);
});

app.use(router);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log("Server listening on port", port);
});
