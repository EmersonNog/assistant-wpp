require("dotenv").config();
const wppconnect = require("@wppconnect-team/wppconnect");

function createClient(sessionName = "sessionName", startCallback) {
  return wppconnect
    .create({
      session: sessionName,
      catchQR: (base64Qr, asciiQR) => {
        console.log(asciiQR);
      },
      logQR: false,
    })
    .then((client) => startCallback(client))
    .catch((error) => console.log(error));
}

module.exports = { createClient };
