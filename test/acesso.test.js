import assert from "node:assert/strict";
import { test } from "node:test";
import handler from "../api/acesso.js";

function requisicao(method, body) {
  const res = {
    headers: {},
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(data) { this.data = data; return this; },
  };
  handler({ method, body }, res);
  return res;
}

test("autentica os dois usuários e autoriza a consulta", () => {
  const administrador = requisicao("POST", {
    usuario: "administrador", senha: "admin-demo", acao: "consultar",
  });
  const aluno = requisicao("POST", {
    usuario: "aluno", senha: "aluno-demo", acao: "consultar",
  });

  assert.equal(administrador.statusCode, 200);
  assert.equal(administrador.data.usuario.perfil, "administrador");
  assert.equal(aluno.statusCode, 200);
  assert.equal(aluno.data.usuario.perfil, "aluno");
});

test("autoriza a ação administrativa somente para o perfil administrador", () => {
  const autorizado = requisicao("POST", {
    usuario: "administrador", senha: "admin-demo", acao: "administrar",
  });
  const negado = requisicao("POST", {
    usuario: "aluno", senha: "aluno-demo", acao: "administrar",
  });

  assert.equal(autorizado.statusCode, 200);
  assert.equal(negado.statusCode, 403);
  assert.equal(negado.data.usuario.perfil, "aluno");
});

test("rejeita credenciais inválidas e entradas incompletas", () => {
  assert.equal(requisicao("POST", {
    usuario: "aluno", senha: "incorreta", acao: "consultar",
  }).statusCode, 401);
  assert.equal(requisicao("POST", {
    usuario: "desconhecido", senha: "aluno-demo", acao: "consultar",
  }).statusCode, 401);
  assert.equal(requisicao("POST", {}).statusCode, 400);
  assert.equal(requisicao("POST", {
    usuario: "aluno", senha: "aluno-demo", acao: "desconhecida",
  }).statusCode, 400);
});

test("limita o método e desativa cache", () => {
  const resposta = requisicao("GET");
  assert.equal(resposta.statusCode, 405);
  assert.equal(resposta.headers.Allow, "POST");
  assert.equal(resposta.headers["Cache-Control"], "no-store");
});
