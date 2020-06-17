const { restHandlerWrapper } = require("../../utils");
const Mongo = require("mongodb");

const setActualityService = (database) =>
  restHandlerWrapper(async (req, res) => {
    const { messages, action } = req.body;
    const ObjectId = Mongo.ObjectID;

    const messagesCollection = database.collection("messages");
    await messages.forEach(async (item) => {
      await messagesCollection.updateOne(
        { _id: ObjectId(item) },
        { $set: { isDeleted: action } }
      );
    });
    const newMessages = await messagesCollection.find({}).toArray();

    const response = JSON.stringify(newMessages);

    res.send(response);
  });

const setPriorityService = (database) =>
  restHandlerWrapper(async (req, res) => {
    const { messages, action } = req.body;
    const ObjectId = Mongo.ObjectID;

    const messagesCollection = database.collection("messages");
    await messages.forEach(async (item) => {
      await messagesCollection.updateOne(
        { _id: ObjectId(item) },
        { $set: { isImportant: action } }
      );
    });
    const newMessages = await messagesCollection.find({}).toArray();

    const response = JSON.stringify(newMessages);

    res.send(response);
  });

const messageService = (database) =>
  restHandlerWrapper(async (req, res) => {
    const id = req.body._id;
    const ObjectId = Mongo.ObjectID;

    const messagesCollection = database.collection("messages");
    const message = await messagesCollection.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { isRead: true } }
    );

    const response = JSON.stringify(message.value);

    res.send(response);
  });

const messagesService = (database) =>
  restHandlerWrapper(async (_, res) => {
    const messagesCollection = database.collection("messages");
    const messages = await messagesCollection.find({}).toArray();
    const response = JSON.stringify(messages);

    res.send(response);
  });

module.exports = {
  messageService,
  messagesService,
  setPriorityService,
  setActualityService,
};
