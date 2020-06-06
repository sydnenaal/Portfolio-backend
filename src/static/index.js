const express = require("express");
const path = require("path");
const cors = require("cors");

const { staticService } = require("./services");
const { STATIC_PATH } = require("../constants");

const staticServer = express();

staticServer.use(express.static(STATIC_PATH));
staticServer.use(cors());

staticServer.get("/*", staticService);

const startStaticServer = ({ port }) => {
  staticServer.listen(port, () => {
    console.log(`Статика доступна на порту ${port}`);
  });
};

module.exports = { startStaticServer };
