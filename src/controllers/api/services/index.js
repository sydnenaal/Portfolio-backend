const messages = require("./messages");
const projects = require("./projects");
const mainPage = require("./mainPage");
const users = require("./users");

module.exports = {
  ...messages,
  ...projects,
  ...mainPage,
  ...users,
};
