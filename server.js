const express = require("express");
const session = require("express-session");
const { apps, keystone } = require("./KeystoneJS");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;

const nextApp = next({ dev, dir: "./UserInterface-UI" });
const handle = nextApp.getRequestHandler();

const server = express();

server.set("trust proxy", 1);
server.use(
  session({
    secret: "f7745f4df4394027716de160fb2acd6aac36699576a8be586b75ac09acf6a0df",
    saveUninitialized: true,
    resave: false,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    cookie: {
      secure: true,
      sameSite: "strict",
    },
  })
);

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
