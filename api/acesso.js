const usuarios = new Map([
  ["administrador", { senha: "admin-demo", nome: "Ana", perfil: "administrador" }],
  ["aluno", { senha: "aluno-demo", nome: "Bruno", perfil: "aluno" }],
]);

export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ erro: "Método não permitido." });
  }

  const { usuario, senha, acao } = req.body ?? {};
  if (
    typeof usuario !== "string" ||
    typeof senha !== "string" ||
    !["consultar", "administrar"].includes(acao)
  ) {
    return res.status(400).json({ erro: "Informe usuário, senha e uma ação válida." });
  }

  const conta = usuarios.get(usuario);
  if (!conta || conta.senha !== senha) {
    return res.status(401).json({ erro: "Usuário ou senha inválidos." });
  }

  const identidade = { nome: conta.nome, perfil: conta.perfil };
  if (acao === "administrar" && conta.perfil !== "administrador") {
    return res.status(403).json({
      erro: "Seu perfil não pode administrar usuários.",
      usuario: identidade,
    });
  }

  return res.status(200).json({
    mensagem: acao === "administrar" ? "Ação administrativa autorizada." : "Consulta autorizada.",
    usuario: identidade,
    recurso: acao === "administrar" ? "Painel de administração (dados fictícios)" : "Conteúdo de exemplo",
  });
}
