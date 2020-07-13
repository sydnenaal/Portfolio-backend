const express = require("express");

const { ROUTES } = require("@constants");
const Services = require("@controllers/secureApi/services");
const { checkTokenExist } = require("@controllers/auth/services");

const getSecureApiRouter = (db) => {
  try {
    const router = express.Router();

    router
      .use(checkTokenExist)
      .patch(ROUTES.CONTACTS_SET, Services.setContactsService(db))
      .get(ROUTES.MAIN_PAGE_INFO, Services.mainPageInfoService(db))
      .get(ROUTES.MESSAGES_LIST, Services.messagesService(db))
      .post(ROUTES.MESSAGES_MESSAGE, Services.messageService(db))
      .post(ROUTES.MESSAGES_PRIORITY, Services.setPriorityService(db))
      .post(ROUTES.MESSAGES_ACTUALITY, Services.setActualityService(db))
      .post(ROUTES.USERS_PASSWORD, Services.passwordChangeService(db))
      .get(ROUTES.USERS_USER, Services.userDataService(db))
      .get(ROUTES.PROJECTS_LIST, Services.projectsService(db))
      .put(ROUTES.PROJECTS_CREATE, Services.createProjectService(db))
      .delete(ROUTES.PROJECTS_DEL, Services.deleteProjectService(db));

    return router;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getSecureApiRouter };
