const STATIC = "/*";

/* Auth */
const AUTH = "/auth";

/* Messages */
const MESSAGES_LIST = "/messages";
const MESSAGES_MESSAGE = "/messages/message";
const MESSAGES_PRIORITY = "/messages/priority";
const MESSAGES_ACTUALITY = "/messages/actuality";

/* Users */
const USERS_PASSWORD = "/users/setPassword";
const USERS_USER = "/users/getUserData";

/* Projects */
const PROJECTS_LIST = "/projects";
const PROJECTS_DEL = "/projects/delete";
const PROJECTS_CREATE = "/projects/insert";

/* Main page */
const MAIN_PAGE_INFO = "/mainPage/info";

module.exports = {
  STATIC,
  AUTH,
  MESSAGES_LIST,
  MESSAGES_MESSAGE,
  MESSAGES_PRIORITY,
  MESSAGES_ACTUALITY,
  USERS_PASSWORD,
  USERS_USER,
  PROJECTS_LIST,
  PROJECTS_DEL,
  PROJECTS_CREATE,
  MAIN_PAGE_INFO,
};
