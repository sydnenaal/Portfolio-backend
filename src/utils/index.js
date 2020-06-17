const CryptoJS = require("crypto-js");

const selectors = require("./selectors");

const logger = (req, res, next) => {
  console.log(req.headers);
  next();
};

const restHandlerWrapper = (arguments) => async (req, res) => {
  try {
    let callback = () => {};
    let checkToken = true;

    //check args type
    switch (typeof arguments) {
      case "function":
        callback = arguments;
        break;
      case "object":
        callback = arguments.callback;
        checkToken = arguments.checkToken;
        break;
      default:
        console.error("Arguments in rest wrapper are not valid.");
        return null;
    }

    if ((checkToken && req.headers.authtoken) || !checkToken) {
      await callback(req, res);
    } else {
      //send unauthorized status
      res.sendStatus(401);
    }
  } catch (error) {
    console.error(error);
  }
};

const decryptDataHandler = (data) => {
  if (!data) {
    return "";
  }

  const encryptedData = data.slice(0, -3);
  const secretKey = data.slice(-3);
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);

  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = {
  restHandlerWrapper,
  decryptDataHandler,
  logger,
  ...selectors,
};
