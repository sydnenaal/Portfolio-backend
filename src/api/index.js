const express = require("express");
const Mongo = require("mongodb");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const { DATABASE_REMOTE_URL, DATABASE_CONFIG } = require("../constants");
const {
  messagesService,
  projectsService,
  authService,
  mainPageInfoService,
  messageService,
  passwordChangeService,
  setPriorityService,
  setActualityService,
  userDataService,
  deleteProjectService,
  createProjectService,
} = require("./services");

const parser = bodyParser.urlencoded({ extended: true });
const apiServer = express();
const MongoClient = Mongo.MongoClient;
const mongoClient = new MongoClient(DATABASE_REMOTE_URL, DATABASE_CONFIG);

apiServer.use(cors());
apiServer.use(bodyParser.json());
apiServer.use(morgan(":method :url :status :response-time ms"));

const startApiServer = ({ port }) => {
  mongoClient.connect((err, client) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Подключение к базе данных...");
      const db = client.db("portfolio");

      // Auth
      apiServer.post("/auth", parser, authService(db));
      // Messages
      apiServer.get("/messages", messagesService(db));
      apiServer.post("/messages/message", parser, messageService(db));
      apiServer.post("/messages/priority", parser, setPriorityService(db));
      apiServer.post("/messages/actuality", parser, setActualityService(db));
      // Users
      apiServer.post("/users/setPassword", parser, passwordChangeService(db));
      apiServer.get("/users/getUserData", userDataService(db));
      // Projects
      apiServer.get("/projects", projectsService(db));
      apiServer.delete("/projects/delete", parser, deleteProjectService(db));
      apiServer.put("/projects/insert", parser, createProjectService(db));
      // MainPage
      apiServer.get("/mainPage/info", mainPageInfoService(db));

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
