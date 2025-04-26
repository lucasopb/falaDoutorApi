# Fala Doutor API

Esta é a API backend do projeto **Fala Doutor**, desenvolvida com Node.js, TypeScript e PostgreSQL.

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- PostgreSQL
- Docker
- Docker Compose

## Pré-requisitos

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) (opcional, para rodar via Docker)

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DA_PASTA>
npm install
```

## Rodando o projeto

Você pode rodar o projeto de duas formas:

### 1. Usando Docker

1. Certifique-se de que o Docker e o Docker Compose estão instalados.
2. Rode os comandos abaixo:

```bash
docker-compose build
docker-compose up
```

O Docker irá configurar automaticamente a aplicação e o banco de dados. O projeto usará as seguintes variáveis de ambiente, já predefinidas:

```
DB_HOST=postgres-db
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=falaDoutorDB
```

### 2. Rodando localmente sem Docker

1. Crie uma instância local do PostgreSQL.
2. Preencha seu arquivo `.env` com as credenciais corretas do banco de dados local. Exemplo:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=seu_banco
```

3. Depois de configurar o `.env`, rode o projeto em modo de desenvolvimento:

```bash
npm run dev
```