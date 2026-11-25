
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Meu ChatGPT está funcionando!");
});

app.post("/api/chat", async (req, res) => {
  try {
    const key = process.env.OPENAI_API_KEY;

    if (!key) {
      return res.status(500).json({
        error: "Chave da OpenAI não configurada."
      });
    }

    const messages = req.body.messages || [];

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
          instructions: "Responda em português do Brasil.",
          input: messages
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "Erro na OpenAI"
      });
    }

    const reply = (data.output || [])
      .flatMap(item => item.content || [])
      .filter(item => item.type === "output_text")
      .map(item => item.text)
      .join("\n");

    res.json({ reply });

  } catch (error) {
    res.status(500).json({
      error: "Erro interno do servidor."
    });
  }
});

app.listen(process.env.PORT || 3000);
