const { messagesService, messageService } = require("./messages");
const { projectsService } = require("./projects");
const { authService } = require("./auth");
const { mainPageInfoService } = require("./mainPage");
const { passwordChangeService } = require("./users");

module.exports = {
  messagesService,
  projectsService,
  authService,
  mainPageInfoService,
  messageService,
  passwordChangeService,
};
