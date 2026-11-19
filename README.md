# 🔐 Módulo 1 — Fundamentos da Segurança em Aplicações Web

> Primeiro contato com segurança de aplicações web: entendendo como uma aplicação funciona, como as informações trafegam e onde podem surgir riscos de segurança.

---

## 📚 Sobre este módulo

Este é o primeiro módulo do curso **Segurança em Aplicações Web**.

Antes de aprender a identificar vulnerabilidades como SQL Injection, XSS ou falhas de autorização, precisamos entender uma coisa fundamental:

> **Como uma aplicação web funciona?**

Neste módulo, vamos sair do navegador, passar pelo HTTP, chegar ao servidor, entender as APIs, observar o banco de dados e acompanhar o caminho de uma requisição.

A proposta é que o aluno não apenas memorize conceitos, mas consiga **visualizar o funcionamento de uma aplicação web na prática**.

Durante as aulas, utilizaremos uma aplicação de laboratório para demonstrar os conceitos apresentados.

### Execute o laboratório

O repositório inclui uma interface em **HTML, JavaScript e React** e uma API
JavaScript compatível com a Vercel. Consulte o [guia do laboratório](docs/README.md)
para instalar, executar, implantar e observar as requisições com o DevTools.

> A aplicação usa apenas exemplos fictícios: não há login, sessão ou banco de
> dados reais. Não envie informações sensíveis.

---

# 🎯 Objetivos de aprendizagem

Ao finalizar este módulo, você deverá ser capaz de:

- explicar, de forma simples, como funciona uma aplicação web;
- diferenciar cliente e servidor;
- compreender o papel do navegador;
- entender o papel de um servidor web;
- compreender o papel do back-end;
- entender o papel de um banco de dados;
- compreender o conceito de API;
- explicar o fluxo de uma requisição HTTP;
- identificar os principais métodos HTTP;
- compreender headers, parâmetros e body;
- entender códigos de status HTTP;
- diferenciar HTTP de HTTPS;
- compreender o conceito de autenticação;
- compreender o conceito de autorização;
- entender o funcionamento básico de cookies e sessões;
- identificar pontos onde podem surgir riscos de segurança.

---

# 🧠 Pré-requisitos

Não é necessário conhecimento avançado de programação.

Este módulo foi pensado para alunos que podem estar tendo seu primeiro contato com segurança de aplicações web.

É recomendado apenas ter conhecimentos básicos de:

- utilização de navegador;
- navegação na internet;
- conceitos básicos de computador.

Durante o curso, os conceitos técnicos serão explicados desde o início.

---

# 🗂️ Conteúdo do módulo

## 1. Como funciona uma aplicação web?

Vamos começar entendendo o que acontece quando acessamos uma aplicação pela internet.

Por exemplo:

```text
https://exemplo.com
```

Quando digitamos esse endereço no navegador, várias coisas acontecem.

De forma simplificada:

```text
┌──────────────┐
│    Usuário   │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│   Navegador  │
└──────┬───────┘
       │
       │ HTTP/HTTPS
       ↓
┌──────────────┐
│    Servidor  │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│   Aplicação  │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│ Banco de Dados│
└──────────────┘
```

Durante a aula vamos entender o papel de cada componente.

---

# 2. Cliente e servidor

## Cliente

O cliente é o sistema que faz uma solicitação.

No contexto de uma aplicação web, normalmente estamos falando do navegador:

- Google Chrome;
- Firefox;
- Safari;
- Microsoft Edge.

Por exemplo:

```text
Navegador
    ↓
"Quero acessar minha conta"
```

## Servidor

O servidor recebe a solicitação e processa aquilo que foi solicitado.

Por exemplo:

```text
Cliente:
GET /perfil

        ↓

Servidor:
"Vou verificar quem é esse usuário."

        ↓

Resposta:
Dados do perfil
```

### Conceito importante

O cliente **solicita**.

O servidor **processa e responde**.

Essa comunicação acontece principalmente através do protocolo HTTP.

---

# 3. Front-end e Back-end

Uma aplicação web normalmente possui diferentes partes.

## Front-end

É a parte com a qual o usuário interage.

Exemplos:

- páginas;
- botões;
- formulários;
- menus;
- tabelas;
- telas de login.

Tecnologias comuns:

- HTML;
- CSS;
- JavaScript;
- React;
- Angular;
- Vue.

## Back-end

É responsável pelo processamento realizado no servidor.

Pode cuidar de:

- autenticação;
- regras de negócio;
- acesso ao banco;
- processamento de pagamentos;
- validação de dados;
- APIs.

Tecnologias comuns:

- Java;
- Spring Boot;
- Node.js;
- Python;
- .NET;
- PHP;
- Go.

### Uma visão simplificada

```text
┌─────────────────────────────┐
│          FRONT-END          │
│                             │
│  Login                      │
│  Cadastro                   │
│  Perfil                     │
│  Produtos                   │
└──────────────┬──────────────┘
               │
               │ HTTP
               ↓
┌─────────────────────────────┐
│           BACK-END          │
│                             │
│  Regras de negócio          │
│  Autenticação               │
│  Autorização                │
│  APIs                       │
└──────────────┬──────────────┘
               │
               ↓
┌─────────────────────────────┐
│        BANCO DE DADOS       │
│                             │
│  Usuários                   │
│  Produtos                   │
│  Pedidos                    │
└─────────────────────────────┘
```

---

# 4. Banco de dados

O banco de dados é utilizado para armazenar informações da aplicação.

Por exemplo:

```text
Usuários
Produtos
Pedidos
Pagamentos
Comentários
Endereços
```

Uma aplicação pode utilizar bancos como:

- PostgreSQL;
- MySQL;
- Oracle;
- SQL Server;
- MongoDB.

Um exemplo simplificado de dados:

```text
USUÁRIOS

id    nome       email
--------------------------------
1     João       joao@email.com
2     Maria      maria@email.com
3     Pedro      pedro@email.com
```

### Por que isso é importante para segurança?

Porque o banco normalmente contém informações importantes.

Se uma vulnerabilidade permitir acesso indevido ao banco, o impacto pode ser muito grande.

Por isso, durante o curso vamos sempre pensar:

> **Quem pode acessar essa informação?**

---

# 5. APIs

Uma API permite que diferentes sistemas se comuniquem.

Por exemplo, o front-end pode solicitar:

```text
GET /api/users/10
```

O back-end processa a solicitação e retorna:

```json
{
  "id": 10,
  "name": "João",
  "email": "joao@email.com"
}
```

Podemos imaginar:

```text
Navegador
    ↓
GET /api/users/10
    ↓
API
    ↓
Banco de Dados
    ↓
API
    ↓
JSON
    ↓
Navegador
```

Durante o curso veremos que **APIs também precisam de segurança**.

---

# 6. HTTP

HTTP significa:

**Hypertext Transfer Protocol**

É um dos principais protocolos utilizados na comunicação entre clientes e servidores web.

Uma requisição pode ser representada assim:

```http
GET /usuarios/10 HTTP/1.1
Host: exemplo.com
```

O servidor processa essa requisição e envia uma resposta.

---

# 7. Métodos HTTP

Os principais métodos que veremos são:

| Método | Uso comum |
|---|---|
| GET | Buscar informações |
| POST | Criar/enviar informações |
| PUT | Atualizar informações |
| PATCH | Atualização parcial |
| DELETE | Remover informações |

Exemplo:

```http
GET /usuarios
```

Pode representar:

> "Quero consultar os usuários."

Enquanto:

```http
POST /usuarios
```

pode representar:

> "Quero criar um novo usuário."

---

# 8. Headers

Headers são informações adicionais enviadas junto com uma requisição ou resposta.

Exemplo:

```http
GET /api/profile HTTP/1.1
Host: exemplo.com
Accept: application/json
Authorization: Bearer token
```

Alguns headers importantes:

- `Host`
- `Content-Type`
- `Accept`
- `Authorization`
- `Cookie`
- `User-Agent`

Mais adiante no curso veremos que headers também possuem grande importância para segurança.

---

# 9. Body

Algumas requisições precisam enviar informações para o servidor.

Por exemplo:

```http
POST /api/login HTTP/1.1
Content-Type: application/json

{
  "username": "joao",
  "password": "123456"
}
```

Neste exemplo:

```text
Headers
   ↓
Content-Type: application/json

Body
   ↓
username
password
```

Esse conceito será importante quando começarmos a analisar vulnerabilidades.

---

# 10. Status HTTP

O servidor também precisa informar o resultado da operação.

Exemplos:

| Código | Significado |
|---|---|
| 200 | OK |
| 201 | Criado |
| 204 | Sem conteúdo |
| 400 | Requisição inválida |
| 401 | Não autenticado |
| 403 | Não autorizado |
| 404 | Não encontrado |
| 500 | Erro interno |

Um conceito especialmente importante para segurança:

### 401 x 403

**401**

> Você não está autenticado.

**403**

> Você está autenticado, mas não possui permissão.

Essa diferença será muito importante quando estudarmos **autorização e controle de acesso**.

---

# 11. HTTP x HTTPS

## HTTP

A comunicação é realizada utilizando HTTP.

## HTTPS

É o HTTP protegido por TLS.

De maneira simplificada:

```text
HTTP
Cliente ──────────────── Servidor
       comunicação

HTTPS
Cliente ════════════════ Servidor
       comunicação protegida
```

O HTTPS ajuda a proteger os dados durante o transporte.

Isso é especialmente importante para informações como:

- senhas;
- tokens;
- dados pessoais;
- informações financeiras;
- cookies de sessão.

### Conceito importante

HTTPS não significa que a aplicação inteira é segura.

Uma aplicação pode utilizar HTTPS e ainda possuir:

- SQL Injection;
- XSS;
- falhas de autorização;
- senhas mal armazenadas;
- configurações inseguras.

HTTPS protege principalmente a **comunicação**, não corrige automaticamente vulnerabilidades da aplicação.

---

# 12. Autenticação

Autenticação responde à pergunta:

> **Quem é você?**

Um exemplo clássico:

```text
Usuário
   ↓
Senha
   ↓
Servidor
   ↓
Credenciais válidas?
   ↓
SIM
   ↓
Usuário autenticado
```

Exemplos de autenticação:

- usuário e senha;
- biometria;
- certificado;
- token;
- autenticação multifator.

---

# 13. Autorização

Autorização responde à pergunta:

> **O que você pode fazer?**

Imagine:

```text
João fez login.
```

Isso significa que João está autenticado.

Mas será que João pode:

```text
Excluir usuários?
Alterar pagamentos?
Acessar dados administrativos?
```

Não necessariamente.

Podemos representar:

```text
AUTENTICAÇÃO

"Quem é você?"
       ↓
"João"


AUTORIZAÇÃO

"O que João pode fazer?"
       ↓
"Consultar seu próprio perfil"
```

---

# 14. Cookies e sessões

Depois que o usuário realiza login, a aplicação precisa saber quem ele é nas próximas requisições.

Um modelo simplificado:

```text
1. Usuário faz login
          ↓
2. Servidor autentica
          ↓
3. Servidor cria uma sessão
          ↓
4. Navegador recebe um identificador
          ↓
5. Navegador envia esse identificador
          ↓
6. Servidor identifica o usuário
```

Esse mecanismo pode envolver cookies.

Exemplo:

```http
Set-Cookie: sessionId=abc123
```

Depois:

```http
Cookie: sessionId=abc123
```

Durante o curso veremos que cookies de sessão precisam ser protegidos adequadamente.

---

# 15. Onde estão os riscos de segurança?

Agora que entendemos como uma aplicação funciona, podemos começar a pensar como profissionais de segurança.

Uma aplicação possui vários pontos de entrada.

```text
                    APLICAÇÃO
                        │
       ┌────────────────┼────────────────┐
       ↓                ↓                ↓
    Front-end          API             Login
       │                │                │
       ↓                ↓                ↓
    Formulários      Parâmetros       Senhas
       │                │                │
       └────────────────┼────────────────┘
                        ↓
                   BACK-END
                        │
                        ↓
                  BANCO DE DADOS
```

Em cada uma dessas partes podemos perguntar:

- O usuário consegue enviar dados inesperados?
- O servidor valida esses dados?
- O usuário está autenticado?
- O usuário possui autorização?
- Informações sensíveis estão protegidas?
- A comunicação está protegida?
- A sessão está protegida?
- O servidor está expondo informações desnecessárias?

---

# 🧪 Laboratório Prático

## Objetivo

Nesta primeira atividade vamos analisar uma aplicação web como um usuário comum.

O objetivo não é procurar uma vulnerabilidade específica ainda.

Queremos aprender a **observar a aplicação**.

---

## Etapa 1 — Acessar a aplicação

Abra o laboratório:

```text
https://SEU-LABORATORIO.vercel.app
```

> O endereço definitivo será disponibilizado durante o curso.

---

## Etapa 2 — Navegar pela aplicação

Explore as funcionalidades disponíveis.

Observe:

- páginas;
- formulários;
- botões;
- login;
- cadastro;
- perfil;
- consultas;
- APIs.

Não tente explorar vulnerabilidades neste momento.

A ideia é entender o funcionamento normal da aplicação.

---

# 🔎 Laboratório — DevTools

Abra o navegador e pressione:

```text
F12
```

ou:

```text
Clique com o botão direito
→ Inspecionar
```

Abra a aba:

```text
Network
```

Agora realize alguma ação na aplicação.

Por exemplo:

```text
Login
```

Observe a requisição gerada.

---

## O que procurar?

Identifique:

### Request

- URL;
- método;
- headers;
- parâmetros;
- body;
- cookies.

### Response

- status HTTP;
- headers;
- body;
- dados retornados.

---

# 📝 Exercício

Escolha uma funcionalidade da aplicação e responda:

### 1. Qual é a URL acessada?

```text
Resposta:
```

### 2. Qual método HTTP foi utilizado?

```text
Resposta:
```

### 3. Quais informações foram enviadas?

```text
Resposta:
```

### 4. Qual foi o status HTTP retornado?

```text
Resposta:
```

### 5. A requisição utiliza cookies?

```text
Resposta:
```

### 6. A comunicação utiliza HTTPS?

```text
Resposta:
```

### 7. Existe alguma informação sensível sendo enviada?

```text
Resposta:
```

---

# 🎯 Desafio

Escolha uma segunda funcionalidade da aplicação e compare com a primeira.

Por exemplo:

```text
Login
       VS
Consulta de perfil
```

Identifique:

- método HTTP;
- URL;
- parâmetros;
- headers;
- cookies;
- resposta;
- status HTTP.

---

# 💡 O que você deve aprender nesta atividade?

O objetivo não é encontrar uma vulnerabilidade.

O objetivo é começar a desenvolver uma habilidade fundamental em segurança:

> **observar como a aplicação funciona.**

Antes de tentar descobrir como quebrar uma aplicação, precisamos entender como ela funciona normalmente.

---

# 🔐 Mentalidade de segurança

Durante todo o curso, vamos utilizar algumas perguntas:

```text
1. O que o usuário controla?

2. O que o servidor controla?

3. O que o usuário consegue enviar?

4. O servidor valida essas informações?

5. Quem pode acessar esse recurso?

6. O usuário está autenticado?

7. O usuário está autorizado?

8. Quais informações estão sendo expostas?

9. O que aconteceria se alguém manipulasse essa requisição?
```

Essas perguntas serão cada vez mais importantes nos próximos módulos.

---

# 🧩 Resumo do módulo

Neste módulo aprendemos:

- [x] O que é uma aplicação web;
- [x] Cliente e servidor;
- [x] Front-end e back-end;
- [x] Banco de dados;
- [x] APIs;
- [x] HTTP;
- [x] Métodos HTTP;
- [x] Headers;
- [x] Body;
- [x] Status HTTP;
- [x] HTTPS;
- [x] Autenticação;
- [x] Autorização;
- [x] Cookies;
- [x] Sessões;
- [x] Pontos de entrada de uma aplicação;
- [x] Inspeção de requisições utilizando DevTools.

---

# 🚀 Próximo módulo

No próximo módulo vamos começar a analisar **vulnerabilidades reais**.

Vamos entender como uma aplicação aparentemente normal pode possuir problemas de segurança e começar pelo **SQL Injection**.

Vamos sair de:

```text
"Como essa aplicação funciona?"
```

para:

```text
"Será que consigo fazer essa aplicação se comportar
de uma maneira que o desenvolvedor não esperava?"
```

A partir daí começaremos a explorar o **OWASP Top 10** e as principais vulnerabilidades de aplicações web.
