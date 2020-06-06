const { restHandlerWrapper } = require("../../utils");

const messageService = (database) =>
  restHandlerWrapper(async (req, res) => {
    const id = req.body._id;
    const ObjectId = Mongo.ObjectID;

    const messagesCollection = database.collection("messages");
    const message = await messagesCollection.findOne({ _id: ObjectId(id) });
    const response = JSON.stringify(message);

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
};
