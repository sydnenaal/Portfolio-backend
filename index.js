const express = require("express");
const path = require("path");
const Mongo = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const MongoClient = Mongo.MongoClient;

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const mongoClient = new MongoClient("mongodb://localhost:27017/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoClient.connect((err, client) => {
  if (err) console.log(err);

  app.locals.db = client.db("portfolio");

  app.listen(9000, () => {
    console.info("Сервер доступен на порту 9000");
    console.info("Приятной работы");
  });

  process.on("SIGINT", () => {
    client.close();
    process.exit();
  });
});

app.use(express.static(path.join(__dirname, "build")));
app.use(cors());

app.post("/auth", urlencodedParser, async (_, res) => {
  const users = app.locals.db.collection("users");
  const user = await users.findOne({}, { userName: "Admin", password: "1" });

  console.log(user.userName);
});

app.get("/message", async (_, res) => {
  const id = 0;
  const responseCallback = (error, message) => {
    if (error) console.log(error);
    const response = JSON.stringify(message);

    res.send(response);
  };

  const messages = app.locals.db.collection("messages");
  await messages.findOne({}, { _id: id }).then(responseCallback);
});
app.get("/visits", async (_, res) => {
  const responseCallback = (error, visits) => {
    if (error) console.log(error);
    const response = JSON.stringify(visits);

    res.send(response);
  };

  const messages = app.locals.db.collection("visits");
  await messages.find({}).toArray(responseCallback);
});

app.get("/newMessages", async (_, res) => {
  const responseCallback = (error, messages) => {
    if (error) console.log(error);
    const counter = messages.filter((item) => item.isRead).length;
    const response = JSON.stringify(counter);

    res.send({ counter: response });
  };

  const messages = app.locals.db.collection("messages");
  await messages.find({}).toArray(responseCallback);
});

app.get("/messages", async (_, res) => {
  const responseCallback = (error, messages) => {
    if (error) console.log(error);
    const response = JSON.stringify(messages);

    res.send(response);
  };

  const messages = app.locals.db.collection("messages");
  await messages.find({}).toArray(responseCallback);
});

app.get("/projects", async (_, res) => {
  const responseCallback = (error, projects) => {
    if (error) console.log(error);
    const response = JSON.stringify(projects);

    res.send(response);
  };

  const messages = app.locals.db.collection("projects");
  await messages.find({}).toArray(responseCallback);
});

app.get("/*", (_, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
