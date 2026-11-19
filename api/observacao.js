const temas = {
  http: "HTTP é o protocolo usado para trocar requisições e respostas na web.",
  api: "Uma API permite que aplicações troquem informações por meio de regras definidas.",
  seguranca: "Validação, autenticação e autorização devem ser verificadas no servidor.",
};

export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "GET") {
    const tema = req.query.tema ?? "http";
    if (typeof tema !== "string" || !Object.hasOwn(temas, tema)) {
      return res.status(400).json({ erro: "Tema inválido. Escolha http, api ou seguranca." });
    }

    return res.status(200).json({ tema, explicacao: temas[tema] });
  }

  if (req.method === "POST") {
    const mensagem = req.body?.mensagem;
    if (typeof mensagem !== "string" || !mensagem.trim() || mensagem.length > 200) {
      return res.status(400).json({ erro: "Informe uma mensagem de 1 a 200 caracteres." });
    }

    return res.status(201).json({
      mensagem: mensagem.trim(),
      aviso: "Exemplo fictício: a mensagem não foi armazenada.",
    });
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ erro: "Método não permitido." });
}
