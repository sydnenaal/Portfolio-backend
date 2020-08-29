const { ObjectID } = require("mongodb");

const getContactsService = (database) => async (req, res) => {
  const contactsCollection = database.collection("contacts");
  const contacts = await contactsCollection.findOne({});
  const response = JSON.stringify(contacts);

  res.send(response);
};

const setContactsService = (database) => async (req, res) => {
  const insertionData = req.body.data;
  const contactsCollection = database.collection("contacts");
  const contacts = await contactsCollection.findOne({});
  await contactsCollection.updateOne(
    { _id: ObjectID(contacts._id) },
    { $set: { ...insertionData } }
  );

  res.sendStatus(200);
};

module.exports = {
  getContactsService,
  setContactsService,
};
