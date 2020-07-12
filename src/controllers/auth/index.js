const express = require("express");

const { authService } = require("@controllers/auth/services");

const getAuthRouter = (database) => {
  const router = express.Router();
  router.use(authService(database));

  return router;
};

module.exports = { getAuthRouter };
