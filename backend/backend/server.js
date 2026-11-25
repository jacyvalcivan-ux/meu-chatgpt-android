
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.send("Meu ChatGPT está funcionando!");
});

app.post("/api/chat", async (req, res) => {
  try {
    const key = process.env.OPENAI_API_KEY;

    if (!key) {
      return res.status(500).json({
        error: "Chave da OpenAI não configurada no Render."
      });
    }

    const messages = req.body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: "Nenhuma mensagem foi enviada."
      });
    }

    const input = messages.map(message => ({
      role: message.role === "assistant" ? "assistant" : "user",
      content: String(message.content || "")
    }));

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${key}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-5.5",
          instructions: "Você é o Meu ChatGPT, um assistente inteligente, educado e prestativo. Responda em português do Brasil.",
          input
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro OpenAI:", data.error?.message);

      return res.status(response.status).json({
        error: data.error?.message || "Erro na conexão com a OpenAI."
      });
    }

    const reply = (data.output || [])
      .flatMap(item => item.content || [])
      .filter(item => item.type === "output_text")
      .map(item => item.text)
      .join("\n");

    return res.json({
      reply: reply || "Não consegui gerar uma resposta."
    });

  } catch (error) {
    console.error("Erro interno:", error);

    return res.status(500).json({
      error: "Falha ao comunicar com o servidor."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Meu ChatGPT ativo na porta ${PORT}`);
});
