const express = require("express");

const { staticService } = require("./services");
const { ROUTES } = require("../constants");

const setStaticRoutes = () => {
  const router = express.Router();

  router.get(ROUTES.STATIC, staticService);

  return router;
};

module.exports = { setStaticRoutes };
