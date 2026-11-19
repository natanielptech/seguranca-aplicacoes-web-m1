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
        <p>Abra o DevTools (F12), selecione <strong>Network</strong> e execute as ações abaixo.</p>
        <div className="forms">
          <form className="card" onSubmit={consultar}>
            <h3>GET · consultar</h3>
            <p>O tema é enviado como parâmetro na URL.</p>
            <label htmlFor="tema">Tema</label>
            <select id="tema" value={tema} onChange={(event) => setTema(event.target.value)}>
              <option value="http">HTTP</option>
              <option value="api">API</option>
              <option value="seguranca">Segurança</option>
            </select>
            <button disabled={carregando} type="submit">Consultar tema</button>
          </form>

          <form className="card" onSubmit={enviarMensagem}>
            <h3>POST · enviar</h3>
            <p>A mensagem é enviada no body, em formato JSON.</p>
            <label htmlFor="mensagem">Mensagem fictícia</label>
            <input id="mensagem" value={mensagem} onChange={(event) => setMensagem(event.target.value)} maxLength={200} required placeholder="Olá, mundo!" />
            <button disabled={carregando} type="submit">Enviar mensagem</button>
          </form>
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
