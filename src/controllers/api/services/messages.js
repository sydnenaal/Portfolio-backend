const { ObjectID } = require("mongodb");

const setActualityService = (database) => async (req, res) => {
  const { messages, action } = req.body;
  const messagesCollection = database.collection("messages");
  await messagesCollection.updateMany(
    { _id: { $in: messages.map((item) => ObjectID(item)) } },
    { $set: { isDeleted: action } }
  );
  const newMessages = await messagesCollection.find({}).toArray();
  const response = JSON.stringify(newMessages);

  res.send(response);
};

const setPriorityService = (database) => async (req, res) => {
  const { messages, action } = req.body;
  const messagesCollection = database.collection("messages");
  await messagesCollection.updateMany(
    { _id: { $in: messages.map((item) => ObjectID(item)) } },
    { $set: { isImportant: action } }
  );
  const newMessages = await messagesCollection.find({}).toArray();
  const response = JSON.stringify(newMessages);

  res.send(response);
};

const messageService = (database) => async (req, res) => {
  const id = req.body._id;
  const messagesCollection = database.collection("messages");
  const message = await messagesCollection.findOneAndUpdate(
    { _id: ObjectID(id) },
    { $set: { isRead: true } }
  );
  const response = JSON.stringify(message.value);

  res.send(response);
};

const messagesService = (database) => async (_, res) => {
  const messagesCollection = database.collection("messages");
  const messages = await messagesCollection.find({}).toArray();
  const response = JSON.stringify(messages);

  res.send(response);
};

module.exports = {
  messageService,
  messagesService,
  setPriorityService,
  setActualityService,
};
