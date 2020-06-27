const Mongo = require("mongodb");
const express = require("express");

const {
  DATABASE_LOCAL_URI,
  DATABASE_REMOTE_URI,
  APP_MODE,
  DATABASE_CONFIG,
  ROUTES,
} = require("@constants");
const Services = require("@api/services");

const DATABASE_URL =
  APP_MODE === "development" ? DATABASE_LOCAL_URI : DATABASE_REMOTE_URI;

const MongoClient = Mongo.MongoClient;
const mongoClient = new MongoClient(DATABASE_URL, DATABASE_CONFIG);

const setApiRoutes = async () => {
  try {
    console.log("Подключение к базе данных...");

    const router = express.Router();
    const connect = await mongoClient.connect();
    const db = connect.db("portfolio");

    /* Auth */
    router.post(ROUTES.AUTH, Services.authService(db));

    /* MainPage */
    router.get(ROUTES.MAIN_PAGE_INFO, Services.mainPageInfoService(db));

    /* Messages */
    router.get(ROUTES.MESSAGES_LIST, Services.messagesService(db));
    router.post(ROUTES.MESSAGES_MESSAGE, Services.messageService(db));
    router.post(ROUTES.MESSAGES_PRIORITY, Services.setPriorityService(db));
    router.post(ROUTES.MESSAGES_ACTUALITY, Services.setActualityService(db));

    /* Users */
    router.post(ROUTES.USERS_PASSWORD, Services.passwordChangeService(db));
    router.get(ROUTES.USERS_USER, Services.userDataService(db));

    /* Projects */
    router.get(ROUTES.PROJECTS_LIST, Services.projectsService(db));
    router.put(ROUTES.PROJECTS_CREATE, Services.createProjectService(db));
    router.delete(ROUTES.PROJECTS_DEL, Services.deleteProjectService(db));

    process.on("SIGINT", () => {
      connect.close();
      process.exit();
    });

    return router;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { setApiRoutes };
