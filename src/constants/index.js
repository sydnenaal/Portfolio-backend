const STATIC_SERVER_PORT = 3000;
const API_SERVER_PORT = 9000;

const STATIC_PATH = __dirname + "/../../build";

const DATABASE_REMOTE_URL =
  "mongodb+srv://derohin:administrator@cluster0-t0s2a.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_LOCAL_URL = "mongodb://localhost:27017/";
const DATABASE_CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = {
  STATIC_PATH,
  STATIC_SERVER_PORT,
  API_SERVER_PORT,
  DATABASE_REMOTE_URL,
  DATABASE_LOCAL_URL,
  DATABASE_CONFIG,
};
