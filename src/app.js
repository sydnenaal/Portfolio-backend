require("dotenv").config();
require("module-alias/register");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const { setStaticRoutes } = require("@static");
const { setApiRoutes } = require("@api");
const { PORT, STATIC_PATH } = require("@constants");

(async () => {
  const server = express();

  const apiRouter = await setApiRoutes({ app: server });
  const staticRouter = setStaticRoutes({ app: server });

  server.use(express.static(STATIC_PATH));
  server.use(cors());
  server.use(bodyParser.json());
  server.use(morgan(":method :url :status :response-time ms"));

  server.use("/api", apiRouter);
  server.use("/", staticRouter);

  server.listen(PORT, () => {
    console.log(`Сервер доступен на порту ${PORT}`);
  });
})();
