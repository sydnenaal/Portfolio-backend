const Mongo = require("mongodb");

const { decryptDataHandler, authTokenSelector } = require("@utils");

const userDataService = (database) => async (req, res) => {
  const _id = authTokenSelector(req);
  const ObjectId = Mongo.ObjectID;

  const usersCollection = database.collection("users");
  const user = await usersCollection.findOne({ _id: ObjectId(_id) });
  const response = JSON.stringify({ name: user.name, photo: user.photo });

  user && res.send(response);
};

const passwordChangeService = (database) => async (req, res) => {
  const { password, oldPassword } = req.body.data;
  const decryptedPassword = decryptDataHandler(password);
  const decryptedOldPassword = decryptDataHandler(oldPassword);
  const _id = authTokenSelector(req);
  const ObjectId = Mongo.ObjectID;

  const usersCollection = database.collection("users");
  const user = await usersCollection.findOne({
    _id: ObjectId(_id),
  });

  if (user.password === decryptedOldPassword) {
    await usersCollection.updateOne(
      { _id: ObjectId(_id) },
      { $set: { password: decryptedPassword } }
    );

    res.sendStatus(200);
  } else {
    res.sendStatus(505);
  }
};

module.exports = {
  passwordChangeService,
  userDataService,
};
