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

app.post("/auth", urlencodedParser, async (req, res) => {
  try {
    console.log(req.body);
    const usersCollection = app.locals.db.collection("users");
    const user = await users.findOne({}, { userName: "Admin", password: "1" });
    console.log(user.userName);
  } catch (error) {
    console.error(error);
  }
});

/*app.get("/message", async (_, res) => {
  const id = 0;
  const responseCallback = (error, message) => {
    if (error) console.log(error);
    const response = JSON.stringify(message);

    res.send(response);
  };

  const messages = app.locals.db.collection("messages");
  await messages.findOne({}, { _id: id }).then(responseCallback);
});*/

app.get("/mainPageInfo", async (_, res) => {
  try {
    const visitsCollection = app.locals.db.collection("visits");
    const messagesCollection = app.locals.db.collection("messages");

    const visits = await visitsCollection.findOne({});
    const messages = await messagesCollection.countDocuments();

    const response = JSON.stringify({
      visits: visits,
      counter: messages,
    });

    res.send(response);
  } catch (error) {
    console.error(error);
  }
});

app.get("/messages", async (_, res) => {
  try {
    const messagesCollection = app.locals.db.collection("messages");
    const messages = await messagesCollection.find({}).toArray();

    const response = JSON.stringify(messages);

    res.send(response);
  } catch (error) {
    console.error(error);
  }
});

app.get("/projects", async (_, res) => {
  try {
    const projectsCollection = app.locals.db.collection("projects");
    const projects = await projectsCollection.find({}).toArray();

    const response = JSON.stringify(projects);

    res.send(response);
  } catch (error) {
    console.error(error);
  }
});

app.get("/*", async (_, res) => {
  try {
    const visitsCollection = app.locals.db.collection("visits");
    const visits = await visitsCollection.findOne({});

    const { _id, day, week, month } = visits;
    await visitsCollection.updateOne(
      { _id: _id },
      {
        $set: {
          day: day + 1,
          week: week + 1,
          month: month + 1,
        },
      }
    );

    res.sendFile(path.join(__dirname, "build", "index.html"));
  } catch (error) {
    console.error(error);
  }
});
