const path = require("path");

const { STATIC_PATH } = require("@constants");

const staticService = async (_, res) => {
  res.sendFile(path.join(STATIC_PATH, "index.html"));
};

module.exports = {
  staticService,
};
