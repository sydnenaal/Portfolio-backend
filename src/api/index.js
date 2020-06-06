const express = require("express");
const Mongo = require("mongodb");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const { DATABASE_URL, DATABASE_CONFIG } = require("../constants");
const {
  messagesService,
  projectsService,
  authService,
  mainPageInfoService,
  messageService,
  passwordChangeService,
} = require("./services");

const parser = bodyParser.urlencoded({ extended: true });
const apiServer = express();
const MongoClient = Mongo.MongoClient;
const mongoClient = new MongoClient(DATABASE_URL, DATABASE_CONFIG);

apiServer.use(cors());
apiServer.use(bodyParser.json());
apiServer.use(morgan(":method :url :status :response-time ms"));

const startApiServer = ({ port }) => {
  mongoClient.connect((err, client) => {
    if (err) {
      console.log(err);
    } else {
      const db = client.db("portfolio");

      apiServer.post("/auth", parser, authService(db));
      apiServer.post("/message", parser, messageService(db));
      apiServer.post("/setPassword", parser, passwordChangeService(db));
      apiServer.get("/projects", projectsService(db));
      apiServer.get("/messages", messagesService(db));
      apiServer.get("/mainPageInfo", mainPageInfoService(db));

      apiServer.listen(port, () => {
        console.info(`Интерфейсы доступны на порту ${port}`);
      });

      process.on("SIGINT", () => {
        client.close();
        process.exit();
      });
    }
  });
};

module.exports = { startApiServer, apiServer };
