const messages = require("./messages");
const projects = require("./projects");
const auth = require("./auth");
const mainPage = require("./mainPage");
const users = require("./users");

module.exports = {
  ...messages,
  ...projects,
  ...auth,
  ...mainPage,
  ...users,
};
