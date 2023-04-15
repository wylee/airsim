import fs from "fs/promises";
import path from "path";

import express from "express";

const env = process.env.NODE_ENV || "development";
const is_prod = env === "production";

export const initRoutes = (app: any) => {
  const router = express.Router();

  const assetsPath = path.join(path.resolve(), "src/ui/assets");
  const distPath = path.join(path.resolve(), "dist");
  const viewsPath = path.join(path.resolve(), "src/api/views");

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
      manifest: await parseManifest(),
    };
    res.render("index.html.ejs", data);
  });

  app.use(router);
};

const parseManifest = async () => {
  if (is_prod) {
    const manifestPath = path.join(path.resolve(), "dist", "manifest.json");
    const manifestFile = await fs.readFile(manifestPath);
    return JSON.parse(manifestFile.toString());
  } else {
    return {};
  }
};
