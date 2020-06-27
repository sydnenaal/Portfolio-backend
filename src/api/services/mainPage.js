const { restHandlerWrapper } = require("@utils");

const mainPageInfoService = (database) =>
  restHandlerWrapper(async (_, res) => {
    const visitsCollection = database.collection("visits");
    const messagesCollection = database.collection("messages");

    const visits = await visitsCollection.findOne({});
    const messages = await messagesCollection.find({}).toArray();

    const unreadMessages = messages.filter(
      (item) => !item.isRead && !item.isDeleted
    );

    const response = JSON.stringify({
      visits: visits,
      counter: unreadMessages.length,
    });

    res.send(response);
  });

module.exports = {
  mainPageInfoService,
};
