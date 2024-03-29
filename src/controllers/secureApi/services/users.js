const { ObjectID } = require("mongodb");

const { decryptDataHandler, authTokenSelector } = require("@utils");

const userDataService = (database) => async (req, res) => {
  const _id = ObjectID(authTokenSelector(req));

  const usersCollection = database.collection("users");
  const user = await usersCollection.findOne({ _id });
  const response = JSON.stringify({ name: user.name, photo: user.photo });

  user && res.send(response);
};

const passwordChangeService = (database) => async (req, res) => {
  const { password, oldPassword } = req.body.data;
  const decryptedPassword = decryptDataHandler(password);
  const decryptedOldPassword = decryptDataHandler(oldPassword);
  const _id = ObjectID(authTokenSelector(req));

  const usersCollection = database.collection("users");
  const user = await usersCollection.findOne({ _id });

  if (user.password === decryptedOldPassword) {
    await usersCollection.updateOne(
      { _id },
      { $set: { password: decryptedPassword } }
    );

    res.sendStatus(200);
  } else {
    res.sendStatus(505);
  }
};

const usernameChangeService = (database) => async (req, res) => {
  const { username } = req.body.data;
  const _id = ObjectID(authTokenSelector(req));

  const usersCollection = database.collection("users");
  const user = await usersCollection.findOne({ _id });

  user &&
    (await usersCollection.updateOne({ _id }, { $set: { name: username } }));

  res.sendStatus(200);
};

const userPhotoChangeService = (database) => async (req, res) => {
  const { photo } = req.body.data;
  const _id = ObjectID(authTokenSelector(req));

  const usersCollection = database.collection("users");
  const user = await usersCollection.findOne({ _id });

  console.log(user);

  // user &&
  //   (await usersCollection.updateOne({ _id }, { $set: { name: username } }));

  res.sendStatus(200);
};

module.exports = {
  passwordChangeService,
  userDataService,
  usernameChangeService,
  userPhotoChangeService,
};
