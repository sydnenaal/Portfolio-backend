const STATIC = "/*";

/* Auth */
const AUTH = "/auth";

/* Visits */
const INCREMENT_VISITS = "/statistic";

/* Contacts */
const CONTACTS_LIST = "/contacts";
const CONTACTS_SET = "/contacts/set";

/* Messages */
const MESSAGES_LIST = "/messages";
const MESSAGES_MESSAGE = "/messages/message";
const MESSAGES_PRIORITY = "/messages/priority";
const MESSAGES_ACTUALITY = "/messages/actuality";

/* Users */
const USERS_PASSWORD = "/users/setPassword";
const USERS_USERNAME = "/users/setUsername";
const USERS_USER = "/users/getUserData";
const USERS_PHOTO = "/users/setPhoto";

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
  USERS_USERNAME,
  USERS_USER,
  PROJECTS_LIST,
  PROJECTS_DEL,
  PROJECTS_CREATE,
  USERS_PHOTO,
  MAIN_PAGE_INFO,
  CONTACTS_LIST,
  CONTACTS_SET,
  INCREMENT_VISITS,
};
