const tokenInterceptorService = require("./tokenCheckInterceptor");
const authService = require("./auth");

module.exports = {
  ...tokenInterceptorService,
  ...authService,
};
