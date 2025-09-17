Desafio Trackfy

Este projeto é uma aplicação backend em TypeScript com Express, usando Prisma e SQLite para gerenciar Áreas, Pessoas e Presenças, com autenticação via Google OAuth 2.0 e proteção de endpoints usando JWT.

link do docs para visualização do processo: https://docs.google.com/document/d/1o5HKVQLIiWiGEUAclRSvuTU7_AyJkH99hI1FT6QKUXw/edit?usp=sharing

Passo 1 - Clonar o repositorio

git clone https://github.com/bmlogs64/desafio-trackfy-bernardo.git

cd desafio-trackfy

2 - Instalar as dependências

Instalando dependências do Node

npm install

Rodar o prisma

npx prisma migrate dev --name init

3 - Rodar a aplicação em modo de desenvolvimento

npm run dev

4 - Autenticar

Para pegar o token primeiro pecisar autenticar via google

Acessando a url: http://localhost:3000/auth/google

Após o login com a conta google, ira aparecer o seu token, coloque o token no header Authorization: Bearer <TOKEN_AQUI>.

Endpoints

É necessário enviar o token JWT no header Authorization: Bearer <token> em todos

POST /pessoas

Cria uma nova pessoa. Necessário passar no body:

{
  "nome": "João Silva",
  "funcao": "Engenheiro",
  "areaID": 1
}

areaID deve corresponder a uma área existente e retorna o objeto da pessoa criada.

POST /areas

Cria uma nova área. É necessário passar os dados no body como JSON:

{
  "nome": "Manufatura",
  "tipo": "Produção",
  "localizacao": "Prédio A"
}

Retorna o objeto da área criada.

POST /presencas

Registra a presença de uma pessoa em uma área.

{
  "pessoaID": 2,
  "areaID": 1
}

Retorna o registro de presença criado, incluindo os dados da pessoa e da área.

GET /pessoas

Lista todas as pessoas e retorna um array de objetos com as pessoas.

GET /pessoas/:id

Busca uma pessoa específica pelo id, o id vai no params da URL e retorna o objeto da pessoa.

GET /areas

Lista todas as áreas existentes e retorna um array de objetos com as áreas.

GET /areas/:id

Busca uma área específica pelo id, o id vai no params da URL e retorna o objeto da área.

GET /presencas

Este endpoint lista todas as presenças ou filtra com base nos query params enviados na URL. É possível passar pessoaID para filtrar pelo ID da pessoa, areaID para filtrar pelo ID da área, e inicio e fim para filtrar por período. Os parâmetros de período aceitam datas completas no formato ISO 8601 (YYYY-MM-DD ou YYYY-MM-DDTHH:mm:ss); se for fornecido apenas o dia (YYYY-MM-DD), o filtro considera o início do dia (00:00:00) como horário inicial, então presenças ocorridas mais tarde podem não ser incluídas corretamente. O retorno é um array com todas as presenças correspondentes, incluindo os dados completos de pessoa e área.
Exemplo de query params:

?pessoaID=2&areaID=1&inicio=2025-09-14T00:00:00&fim=2025-09-16T23:59:59

GET /presencas/relatorio/periodo

Este endpoint retorna a contagem de presenças agrupadas por período. Também é possível filtrar por inicio e fim usando query params no formato completo ISO 8601, para que o relatório considere corretamente os horários das presenças. O retorno mostra o período filtrado e a quantidade de presenças dentro dele. Se os parâmetros não forem informados, o relatório considera todas as presenças registradas.

GET /presencas/relatorio/area

Retorna a contagem de presenças agrupadas por área. Pode filtrar por query param areaID.

GET /presencas/relatorio/area/:areaID

Mesma função do anterior, mas filtra diretamente pelo areaID passado no params da URL.

Decisões técnicas adotadas

O projeto foi desenvolvido em TypeScript com Express para fornecer uma API REST fortemente tipada. Para persistência de dados, usei Prisma ORM com SQLite, facilitando a modelagem de relações entre Áreas, Pessoas e Presenças, além de permitir consultas com filtros dinâmicos e agregações.

A aplicação foi organizada de forma modular, separando controllers, services, routes e middleware em pastas distintas. Essa abordagem permite que cada responsabilidade fique bem delimitada: controllers cuidam da lógica de entrada e saída HTTP, services encapsulam a lógica de negócio e acesso ao banco de dados via Prisma, routes definem os endpoints da API e middleware gerencia autenticação e outros filtros. Essa estrutura modular facilita a manutenção, a escalabilidade do projeto e a adição de novas funcionalidades sem impactar o restante do sistema.

A autenticação foi feita via Google OAuth 2.0, usando Passport com a estratégia passport-google-oauth20, permitindo login sem senha. O retorno do Google é utilizado para criar ou localizar usuários no banco de dados e gerar tokens JWT para autenticar endpoints protegidos.

Para proteger rotas sensíveis, implementei um middleware autenticar que valida o token JWT no header Authorization. Isso garante que apenas usuários autenticados possam criar, alterar ou consultar dados críticos.

Sugestões de melhoria

Adicionar roles de usuário (administrador, visitante, funcionário) para controle de permissões mais granular.

Incluir logs de auditoria para monitorar ações do usuário e aumentar a segurança.

Migrar de SQLite para PostgreSQL ou MySQL em produção para escalabilidade e concorrência.
