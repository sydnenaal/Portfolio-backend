const messages = require("./messages");
const projects = require("./projects");
const mainPage = require("./mainPage");
const users = require("./users");
const contacts = require("./contacts");

module.exports = {
  ...messages,
  ...projects,
  ...mainPage,
  ...users,
  ...contacts,
};
