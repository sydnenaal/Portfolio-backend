const { ObjectID } = require("mongodb");

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
  setContactsService,
};
