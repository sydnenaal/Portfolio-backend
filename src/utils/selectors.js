const authTokenSelector = (req) => req.headers.authtoken;

module.exports = {
  authTokenSelector,
};
