const { decryptDataHandler, restHandlerWrapper } = require("../../utils");

const passwordChangeService = (database) =>
  restHandlerWrapper(async (req, res) => {
    const decryptedPassword = decryptDataHandler(req.body.data);
    const _id = req.headers.token;
    const ObjectId = Mongo.ObjectID;

    const usersCollection = database.collection("users");
    await usersCollection.updateOne(
      { _id: ObjectId(_id) },
      { $set: { password: decryptedPassword } }
    );

    res.sendStatus(200);
  });

module.exports = {
  passwordChangeService,
};
