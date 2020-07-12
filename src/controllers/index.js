const { getApiRouter } = require("./api");
const { getStaticRouter } = require("./static");
const { getAuthRouter } = require("./auth");

module.exports = { getApiRouter, getStaticRouter, getAuthRouter };
