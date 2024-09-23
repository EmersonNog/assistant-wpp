const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let hasIntroduced = {};
let conversationHistory = {};

async function getGeminiResponse(userMessage, userId) {
  let prompt;

  if (!conversationHistory[userId]) {
    conversationHistory[userId] = [];
  }

  conversationHistory[userId].push(`Usuário: ${userMessage}`);

  if (!hasIntroduced[userId]) {
    prompt = `Você é a I.A e a segunda mente do Nogueira, ele é o seu dono. Seu nome é Cyra. Apresente-se de forma curta e diga que podem bater um papo com você.`;
    hasIntroduced[userId] = true;
  } else if (
    (userMessage.toLowerCase().includes("idade") ||
      userMessage.toLowerCase().includes("anos")) &&
    userMessage.toLowerCase().includes("nogueira")
  ) {
    prompt = "Nogueira tem 23 anos de idade. Apenas informe isso.";
  } else if (
    (userMessage.toLowerCase().includes("profissão") ||
      userMessage.toLowerCase().includes("profissao") ||
      userMessage.toLowerCase().includes("emprego") ||
      userMessage.toLowerCase().includes("trabalho")) &&
    userMessage.toLowerCase().includes("nogueira")
  ) {
    prompt =
      "Nogueira trabalha como desenvolvedor de software e analise de dados. Atualmente trabalha na Empresa Certare Engenharia. Informe isso apenas.";
  } else {
    prompt = `Aqui está o histórico da conversa:\n${conversationHistory[
      userId
    ].join("\n")}\nI.A:`;
  }

  try {
    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text();

    conversationHistory[userId].push(`I.A: ${aiResponse}`);
    return aiResponse;
  } catch (error) {
    console.error("Erro ao obter resposta da Gemini: ", error);
    return "Desculpe, houve um erro ao processar sua solicitação.";
  }
}

module.exports = { getGeminiResponse };
