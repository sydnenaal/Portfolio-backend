const { startStaticServer } = require("./src/static");
const { startApiServer } = require("./src/api");
const { API_SERVER_PORT, STATIC_SERVER_PORT } = require("./src/constants");

startStaticServer({ port: STATIC_SERVER_PORT });
startApiServer({ port: API_SERVER_PORT });
