const CryptoJS = require("crypto-js");

const selectors = require("@utils/selectors");

const decryptDataHandler = (data) => {
  if (!data) return "";

  const encryptedData = data.slice(0, -3);
  const secretKey = data.slice(-3);
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);

  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = {
  decryptDataHandler,
  ...selectors,
};
