const { decryptDataHandler } = require("@utils");

const authService = (database) => async (req, res) => {
  const { login, password } = JSON.parse(decryptDataHandler(req.body.data));

  const usersCollection = database.collection("users");
  const user = await usersCollection.findOne({
    login: login,
    password: password,
  });
  const response =
    user &&
    JSON.stringify({
      token: user._id,
      name: user.name,
      photo: user.photo,
    });

  user ? res.send(response) : res.sendStatus("500");
};

module.exports = {
  authService,
};
