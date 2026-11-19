import { useState } from "react";

const etapas = [
  ["1", "Navegador", "Você interage com a página e inicia uma requisição."],
  ["2", "HTTP / HTTPS", "Método, URL, headers e, às vezes, body viajam até o servidor."],
  ["3", "API", "O servidor valida a entrada e responde com um status e JSON."],
];

export default function App() {
  const [tema, setTema] = useState("http");
  const [mensagem, setMensagem] = useState("");
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [usuario, setUsuario] = useState("administrador");
  const [senha, setSenha] = useState("");

  async function enviar(url, options) {
    setErro("");
    setResultado(null);
    setCarregando(true);
    try {
      const resposta = await fetch(url, options);
      const contentType = resposta.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error("A API não está disponível. Execute o laboratório com Vercel Dev ou no deploy.");
      }
      const dados = await resposta.json();
      setResultado({ metodo: options.method, url, status: resposta.status, dados });
    } catch (error) {
      setErro(error.message || "Não foi possível acessar a API.");
    } finally {
      setCarregando(false);
    }
  }

  function consultar(event) {
    event.preventDefault();
    enviar(`/api/observacao?tema=${encodeURIComponent(tema)}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
  }

  function enviarMensagem(event) {
    event.preventDefault();
    enviar("/api/observacao", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ mensagem }),
    });
  }

  function consultarTemaInvalido() {
    enviar("/api/observacao?tema=desconhecido", {
      method: "GET",
      headers: { Accept: "application/json" },
    });
  }

  function tentarMetodoNaoPermitido() {
    enviar("/api/observacao", {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });
  }

  function acessar(acao) {
    enviar("/api/acesso", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, senha, acao }),
    });
  }

  return (
    <main>
      <header className="hero">
        <p className="eyebrow">MÓDULO 1 · LABORATÓRIO</p>
        <h1>Observe como a web funciona</h1>
        <p>Experimente requisições reais e acompanhe o caminho entre navegador e servidor.</p>
        <p className="notice">Use apenas dados fictícios. Este laboratório não possui login, sessão ou banco de dados.</p>
      </header>

      <section aria-labelledby="fluxo">
        <h2 id="fluxo">O caminho de uma requisição</h2>
        <div className="steps">
          {etapas.map(([numero, titulo, texto]) => (
            <article className="card" key={numero}>
              <span className="number">{numero}</span>
              <h3>{titulo}</h3>
              <p>{texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="experimente">
        <h2 id="experimente">Experimente na prática</h2>
        <p>Abra o DevTools (F12), selecione <strong>Network</strong> e compare estes quatro exemplos de requisição e resposta.</p>
        <div className="forms">
          <form className="card" onSubmit={consultar}>
            <h3>Exemplo 1 · GET válido</h3>
            <p>Consulta um tema. O valor selecionado aparece como parâmetro na URL.</p>
            <pre><code>{`GET /api/observacao?tema=${tema}\nAccept: application/json`}</code></pre>
            <label htmlFor="tema">Tema</label>
            <select id="tema" value={tema} onChange={(event) => setTema(event.target.value)}>
              <option value="http">HTTP</option>
              <option value="api">API</option>
              <option value="seguranca">Segurança</option>
            </select>
            <button disabled={carregando} type="submit">Enviar GET · esperado 200</button>
          </form>

          <form className="card" onSubmit={enviarMensagem}>
            <h3>Exemplo 2 · POST válido</h3>
            <p>A mensagem vai no body JSON. Uma resposta 201 indica envio aceito, não armazenamento permanente.</p>
            <pre><code>{'POST /api/observacao\nContent-Type: application/json\n\n{"mensagem":"Olá, mundo!"}'}</code></pre>
            <label htmlFor="mensagem">Mensagem fictícia</label>
            <input id="mensagem" value={mensagem} onChange={(event) => setMensagem(event.target.value)} maxLength={200} required placeholder="Olá, mundo!" />
            <button disabled={carregando} type="submit">Enviar POST · esperado 201</button>
          </form>

          <div className="card">
            <h3>Exemplo 3 · parâmetro inválido</h3>
            <p>O servidor valida o tema recebido e responde 400 quando ele não é permitido.</p>
            <pre><code>{"GET /api/observacao?tema=desconhecido\n\nResposta: 400 Bad Request"}</code></pre>
            <button disabled={carregando} onClick={consultarTemaInvalido} type="button">Enviar GET inválido · esperado 400</button>
          </div>

          <div className="card">
            <h3>Exemplo 4 · método não permitido</h3>
            <p>A API aceita GET e POST. Para outro método, responde 405 e informa os métodos aceitos.</p>
            <pre><code>{"DELETE /api/observacao\n\nResposta: 405 Method Not Allowed\nAllow: GET, POST"}</code></pre>
            <button disabled={carregando} onClick={tentarMetodoNaoPermitido} type="button">Enviar DELETE · esperado 405</button>
          </div>
        </div>
        <div className="card response" aria-live="polite">
          <h3>Resposta da API</h3>
          {carregando && <p>Enviando requisição...</p>}
          {erro && <p role="alert">{erro}</p>}
          {resultado && (
            <>
              <p><strong>{resultado.metodo}</strong> {resultado.url} · Status <strong>{resultado.status}</strong></p>
              <pre>{JSON.stringify(resultado.dados, null, 2)}</pre>
            </>
          )}
          {!carregando && !erro && !resultado && <p>Escolha uma ação para ver a resposta aqui.</p>}
        </div>
      </section>

      <section aria-labelledby="controle-acesso">
        <h2 id="controle-acesso">Autenticação e autorização</h2>
        <p>Entre com uma das contas fictícias e compare o acesso dos perfis. A API confere as credenciais e a permissão no servidor.</p>
        <div className="forms">
          <form className="card" onSubmit={(event) => {
            event.preventDefault();
            acessar("consultar");
          }}>
            <h3>Exemplo · dois perfis</h3>
            <p>Administrador: <code>administrador / admin-demo</code><br />Aluno: <code>aluno / aluno-demo</code></p>
            <pre><code>{'POST /api/acesso\n{"usuario":"aluno","senha":"aluno-demo","acao":"administrar"}\n\nResposta esperada: 403 Forbidden'}</code></pre>
            <label htmlFor="usuario">Usuário de demonstração</label>
            <select id="usuario" value={usuario} onChange={(event) => setUsuario(event.target.value)} autoComplete="username">
              <option value="administrador">Ana · administradora</option>
              <option value="aluno">Bruno · aluno</option>
            </select>
            <label htmlFor="senha">Senha fictícia</label>
            <input id="senha" type="password" value={senha} onChange={(event) => setSenha(event.target.value)} autoComplete="current-password" required />
            <div className="example-actions">
              <button disabled={carregando} type="submit">Consultar conteúdo · esperado 200</button>
              <button disabled={carregando} onClick={() => acessar("administrar")} type="button">Administrar usuários · esperado 200 ou 403</button>
            </div>
          </form>
          <div className="card">
            <h3>O que observar</h3>
            <ul>
              <li><strong>Autenticação:</strong> credenciais inválidas recebem 401.</li>
              <li><strong>Autorização:</strong> aluno autenticado recebe 403 ao tentar administrar.</li>
              <li>As duas contas podem consultar conteúdo; só a administradora pode administrar.</li>
            </ul>
            <p>Troque a senha para ver a resposta 401. Verifique o status e o JSON em Network.</p>
          </div>
        </div>
      </section>

      <section className="card" aria-labelledby="seguranca">
        <h2 id="seguranca">Perguntas de segurança</h2>
        <ul>
          <li>Quais dados você controla na URL ou no body?</li>
          <li>O servidor valida os dados recebidos?</li>
          <li>Quem poderia acessar essa resposta?</li>
          <li>Em produção, a comunicação utiliza HTTPS?</li>
        </ul>
        <p>HTTPS protege o transporte, mas não substitui autenticação, autorização ou validação no servidor.</p>
      </section>
    </main>
  );
}
