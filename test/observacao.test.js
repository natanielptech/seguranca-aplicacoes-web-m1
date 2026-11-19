import assert from "node:assert/strict";
import { test } from "node:test";
import handler from "../api/observacao.js";

function requisicao(method, query = {}, body) {
  const res = {
    headers: {},
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(data) { this.data = data; return this; },
  };
  handler({ method, query, body }, res);
  return res;
}

test("GET consulta temas conhecidos e rejeita parâmetros inválidos", () => {
  assert.equal(requisicao("GET").data.tema, "http");
  assert.equal(requisicao("GET", { tema: "api" }).statusCode, 200);
  assert.equal(requisicao("GET", { tema: "seguranca" }).data.tema, "seguranca");
  for (const tema of ["desconhecido", "__proto__", ["http"]]) {
    assert.equal(requisicao("GET", { tema }).statusCode, 400);
  }
});

test("POST valida o body e não armazena a mensagem", () => {
  const resposta = requisicao("POST", {}, { mensagem: " Olá " });
  assert.equal(resposta.statusCode, 201);
  assert.equal(resposta.data.mensagem, "Olá");
  assert.match(resposta.data.aviso, /não foi armazenada/);
  for (const body of [undefined, {}, { mensagem: "  " }, { mensagem: 1 }, { mensagem: "a".repeat(201) }]) {
    assert.equal(requisicao("POST", {}, body).statusCode, 400);
  }
});

test("métodos não suportados retornam 405 e indicam os permitidos", () => {
  const resposta = requisicao("DELETE");
  assert.equal(resposta.statusCode, 405);
  assert.equal(resposta.headers.Allow, "GET, POST");
  assert.equal(resposta.headers["Cache-Control"], "no-store");
});
