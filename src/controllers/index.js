const { getSecureApiRouter } = require("./secureApi");
const { getPublicApiRouter } = require("./publicApi");
const { getStaticRouter } = require("./static");
const { getAuthRouter } = require("./auth");

module.exports = {
  getSecureApiRouter,
  getPublicApiRouter,
  getStaticRouter,
  getAuthRouter,
};
