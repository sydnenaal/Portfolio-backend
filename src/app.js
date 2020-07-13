require("dotenv").config();
require("module-alias/register");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const controllers = require("@controllers");
const { initializeDatabaseConnection } = require("@database");
const {
  PORT,
  STATIC_PATH,
  DATABASE_URI,
  DATABASE_CONFIG,
} = require("@constants");

(async () => {
  const server = express();

  const database = await initializeDatabaseConnection(
    DATABASE_URI,
    DATABASE_CONFIG
  );

  const secureApiRouter = controllers.getSecureApiRouter(database);
  const publicApiRouter = controllers.getPublicApiRouter(database);
  const authRouter = controllers.getAuthRouter(database);
  const staticRouter = controllers.getStaticRouter();

  server
    .use(express.static(STATIC_PATH))
    .use(cors())
    .use(bodyParser.json())
    .use(morgan(":method :url :status :response-time ms"))
    .use("/api/secure", secureApiRouter)
    .use("/api/public", publicApiRouter)
    .use("/auth", authRouter)
    .use("/", staticRouter)
    .listen(PORT, () => {
      console.log(`Сервер доступен на порту ${PORT}`);
    });
})();
