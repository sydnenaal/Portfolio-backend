const setMessageService = (database) => async (req, res) => {
  const insertionData = {
    ...req.body.data,
    date: Date.now(),
    isRead: false,
    isImportant: false,
    isDeleted: false,
  };
  const messagesCollection = database.collection("messages");
  await messagesCollection.insertOne(insertionData);

  res.sendStatus(200);
};

module.exports = {
  setMessageService,
};
