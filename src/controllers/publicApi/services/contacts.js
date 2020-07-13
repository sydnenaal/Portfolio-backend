const getContactsService = (database) => async (req, res) => {
  const contactsCollection = database.collection("contacts");
  const contacts = await contactsCollection.findOne({});
  const response = JSON.stringify(contacts);

  res.send(response);
};

module.exports = {
  getContactsService,
};
