const express = require("express");

const { ROUTES } = require("@constants");
const Services = require("@controllers/publicApi/services");

const getPublicApiRouter = (db) => {
  try {
    const router = express.Router();

    return router
      .get(ROUTES.CONTACTS_LIST, Services.getContactsService(db))
      .get(ROUTES.INCREMENT_VISITS, Services.setVisitsService(db))
      .put(ROUTES.MESSAGES_MESSAGE, Services.setMessageService(db));
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getPublicApiRouter };
