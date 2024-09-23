const { createClient } = require("./src/config/wppconnect");
const { handleIncomingMessage } = require("./src/handlers/messageHandler");

function start(client) {
  client.onMessage((message) => handleIncomingMessage(client, message));
}

createClient("sessionName", start);
