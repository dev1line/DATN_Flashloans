// https://v5.keystonejs.com/guides/custom-server

const express = require("express");
const { apps, keystone } = require("./DongDu-API");
const { next } = require("./DongDu/customserver");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT;

const nextApp = next({ dev, dir: "./DongDu" });
const handle = nextApp.getRequestHandler();

const server = express();

(async () => {
  const { middlewares } = await keystone.prepare({
    apps: apps,
    dev,
  });
  console.log("Connecting to API...");
  await keystone.connect();
  console.log("Connected to API!");
  server.use(middlewares);

  await nextApp.prepare();
  server.get("*", (req, res) => handle(req, res));

  await server.listen(port);
  console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
})();
