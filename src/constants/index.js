const ROUTES = require("./routes");

const { PORT, DATABASE_LOCAL_URI, DATABASE_REMOTE_URI, NODE_ENV } = process.env;
const DATABASE_URI =
  NODE_ENV === "development" ? DATABASE_LOCAL_URI : DATABASE_REMOTE_URI;
const STATIC_PATH = __dirname + "/../../build";
const DATABASE_CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = {
  ROUTES,
  STATIC_PATH,
  PORT,
  DATABASE_URI,
  DATABASE_CONFIG,
};
