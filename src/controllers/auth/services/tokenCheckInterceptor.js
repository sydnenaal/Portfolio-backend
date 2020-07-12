const { authTokenSelector } = require("@utils/selectors");

const checkTokenExist = async (req, res, next) => {
  const token = authTokenSelector(req);
  token ? next() : res.sendStatus(401);
};

module.exports = { checkTokenExist };
