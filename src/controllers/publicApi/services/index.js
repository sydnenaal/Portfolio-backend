const messagesService = require("./messages");
const visitsService = require("./statistic");
const contactsService = require("./contacts");

module.exports = {
  ...messagesService,
  ...visitsService,
  ...contactsService,
};
