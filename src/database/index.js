const Mongo = require("mongodb");

const initializeDatabaseConnection = async (DATABASE_URI, DATABASE_CONFIG) => {
  console.log("Подключение к базе данных...");

  const mongoClient = new Mongo.MongoClient(DATABASE_URI, DATABASE_CONFIG);
  const connect = await mongoClient.connect();

  process.on("SIGINT", () => {
    connect.close();
    process.exit();
  });

  return connect.db("portfolio");
};

module.exports = { initializeDatabaseConnection };
