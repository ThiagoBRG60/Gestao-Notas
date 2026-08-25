# Gestão de Notas Fiscais

Aplicação web para consulta, filtragem e processamento de notas fiscais.

## Stack

- Next.js
- React
- TypeScript
- PostgreSQL
- Tailwind CSS

## Funcionalidades

- Listagem de notas fiscais
- Filtro por status
- Processamento de notas fiscais pendentes
- Integração com API própria
- Persistência dos dados em PostgreSQL

## Arquitetura

- `src/app`: páginas, layout e rotas da API
- `src/services`: regras de comunicação e operações relacionadas às notas fiscais
- `src/lib`: configuração e conexão com o banco de dados
- `src/types`: tipagens compartilhadas da aplicação
- `src/app/api`: endpoints da aplicação

### Principais endpoints

- `GET /api/invoices`: lista as notas fiscais
- `GET /api/invoices?status=STATUS`: filtra por status
- `POST /api/invoices/:id/process`: processa uma nota fiscal

## Como executar

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Acesse:

```text
http://localhost:3000
```

## Scripts disponíveis

```bash
npm run dev      # inicia o ambiente de desenvolvimento
npm run build    # gera a versão de produção
npm run start    # inicia a aplicação em produção
npm run lint     # executa o lint
```