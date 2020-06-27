const path = require("path");

const { restHandlerWrapper } = require("@utils");
const { STATIC_PATH } = require("@constants");

const staticService = restHandlerWrapper({
  checkToken: false,
  callback: async (_, res) => {
    res.sendFile(path.join(STATIC_PATH, "index.html"));
  },
});

module.exports = {
  staticService,
};
