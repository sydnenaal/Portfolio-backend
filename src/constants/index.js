const ROUTES = require("./routes");

const PORT = process.env.PORT;
const STATIC_PATH = __dirname + "/../../build";
const DATABASE_LOCAL_URI = process.env.DATABASE_LOCAL_URI;
const DATABASE_REMOTE_URI = process.env.DATABASE_REMOTE_URI;
const APP_MODE = process.env.NODE_ENV;
const DATABASE_CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = {
  ROUTES,
  STATIC_PATH,
  PORT,
  DATABASE_LOCAL_URI,
  DATABASE_REMOTE_URI,
  APP_MODE,
  DATABASE_CONFIG,
};
