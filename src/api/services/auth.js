const { decryptDataHandler, restHandlerWrapper } = require("../../utils");

const authService = (database) =>
  restHandlerWrapper({
    checkToken: false,
    callback: async (req, res) => {
      const { login, password } = JSON.parse(decryptDataHandler(req.body.data));

      const usersCollection = database.collection("users");
      const user = await usersCollection.findOne({
        login: login,
        password: password,
      });

      user
        ? res.send(
            JSON.stringify({
              token: user._id,
              name: user.name,
              photo: user.photo,
            })
          )
        : res.sendStatus("500");
    },
  });

module.exports = {
  authService,
};
