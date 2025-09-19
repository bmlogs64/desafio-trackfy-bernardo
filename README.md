# 📌 Desafio Trackfy

Este projeto é uma aplicação backend em **TypeScript com Express**, usando **Prisma** e **SQLite** para gerenciar **Áreas, Pessoas e Presenças**, com autenticação via **Google OAuth 2.0** e proteção de endpoints via **JWT**.

📄 Documentação do processo: [Google Docs](https://docs.google.com/document/d/1o5HKVQLIiWiGEUAclRSvuTU7_AyJkH99hI1FT6QKUXw/edit?usp=sharing)

## 🚀 Como rodar o projeto

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/bmlogs64/desafio-trackfy-bernardo.git
cd desafio-trackfy
```

### 2️⃣ Instalar dependências

```bash
npm install
```

Rodar as migrations do Prisma:

```bash
npx prisma migrate dev --name init
```

### 3️⃣ Rodar em modo de desenvolvimento

```bash
npm run dev
```

### 4️⃣ Autenticação

Para obter o token JWT é necessário autenticar via Google:

Acesse:

```bash
http://localhost:3000/auth/google
```

Após o login, será retornado o token JWT, que deve ser enviado no header em todos os requests protegidos:

```makefile
Authorization: Bearer <TOKEN_AQUI>.
```

## 📊 Endpoints

Todos os endpoints exigem envio do JWT no header.

### 👉 Para explorar a documentação interativa da API, acesse o Swagger UI:

```bash
http://localhost:3000/api-docs
```

No Swagger você pode visualizar todos os endpoints, parâmetros (query, params e body), schemas de entrada e saída, além de testar requisições diretamente pela interface.

### 👤 Pessoas

POST /pessoas → Cria uma nova pessoa.

Body:

```json
{
  "nome": "João Silva",
  "funcao": "Engenheiro",
  "areaID": 1
}
```

GET /pessoas → Lista todas as pessoas.
GET /pessoas/:id → Busca pessoa específica pelo ID (via params).

### 🏢 Áreas

POST /areas → Cria uma nova área.
Body:

```json
{
  "nome": "Manufatura",
  "tipo": "Produção",
  "localizacao": "Prédio A"
}
```

GET /areas → Lista todas as áreas.
GET /areas/:id → Busca uma área específica pelo ID (via params).

Retorna o objeto da área criada.

### 🕒 Presenças

POST /presencas → Registra presença.
Body:

```json
{
  "pessoaID": 2,
  "areaID": 1
}
```

GET /presencas → Lista todas as presenças ou filtra por query params:

```makefile
?pessoaID=2&areaID=1&inicio=2025-09-14T00:00:00&fim=2025-09-16T23:59:59
```

pessoaID → filtra pelo ID da pessoa

areaID → filtra pelo ID da área

inicio e fim → período (datas ISO 8601).

⚠️ Se passar apenas YYYY-MM-DD, o filtro considera 00:00:00 do dia, podendo excluir presenças registradas mais tarde.

Retorno:

```json
[
  {
    "id": 1,
    "pessoa": { "id": 2, "nome": "João Silva" },
    "area": { "id": 1, "nome": "Manufatura" },
    "dataHora": "2025-09-14T14:30:00Z"
  }
]
```

### 📈 Relatórios

GET /presencas/relatorio/periodo
Retorna a contagem de presenças em um período:
Query params opcionais → inicio, fim (ISO 8601).
Exemplo:

```json
[
  { "inicio": "2025-09-14T00:00:00", "fim": "2025-09-16T23:59:59", "quantidade": 5 }
]
```

GET /presencas/relatorio/area
Retorna presenças agrupadas por área.
Query param opcional → areaID.

GET /presencas/relatorio/area/:areaID
Mesma função, mas filtrando pelo param areaID.

## ⚙️ Decisões Técnicas

O projeto foi desenvolvido em TypeScript com Express para fornecer uma API REST fortemente tipada. Para persistência de dados, usei Prisma ORM com SQLite, facilitando a modelagem de relações entre Áreas, Pessoas e Presenças, além de permitir consultas com filtros dinâmicos e agregações.

A aplicação foi organizada de forma modular, separando controllers, services, routes e middleware em pastas distintas. Essa estrutura garante responsabilidades bem definidas: controllers cuidam da lógica HTTP, services encapsulam regras de negócio, routes definem endpoints e middleware gerencia autenticação. Essa separação facilita manutenção, escalabilidade e adição de novas features.

A autenticação foi implementada via Google OAuth 2.0 com passport-google-oauth20. O login do Google cria ou busca usuários no banco e gera tokens JWT para proteger os endpoints.

As rotas sensíveis são protegidas por um middleware autenticar que valida o token JWT no header, garantindo que apenas usuários autenticados possam acessar recursos críticos.

## 💡 Sugestões de Melhoria

Adicionar roles de usuário (admin, funcionário, visitante).

Implementar logs de auditoria para maior segurança.

Migrar de SQLite para PostgreSQL ou MySQL em produção para escalabilidade.
