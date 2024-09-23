const { getGeminiResponse } = require("../services/geminiService");

async function handleIncomingMessage(client, message) {
  if (message.body) {
    client.sendSeen(message.from);
    client.startTyping(message.from);

    const geminiResponse = await getGeminiResponse(message.body, message.from);

    setTimeout(() => {
      client.stopTyping(message.from);

      client
        .sendText(message.from, geminiResponse)
        .then((result) => {
          console.log("Mensagem enviada: ", result);
        })
        .catch((erro) => {
          console.error("Erro ao enviar a mensagem: ", erro);
        });
    }, 2000);
  }
}

module.exports = { handleIncomingMessage };
