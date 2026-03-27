FACULDADE GRAN (https://faculdade.grancursosonline.com.br/)

Projeto Disciplina Projeto Integrador

## API

Backend em NestJS com SQLite para testes locais.

### Endpoints

- `POST /produtos`
- `GET /produtos`
- `GET /produtos/:id`
- `PATCH /produtos/:id`
- `DELETE /produtos/:id`
- `POST /fornecedores`
- `GET /fornecedores`
- `GET /fornecedores/:id`
- `PATCH /fornecedores/:id`
- `DELETE /fornecedores/:id`
- `POST /produto-fornecedores`
- `DELETE /produto-fornecedores/:produtoId/:fornecedorId`
- `GET /produto-fornecedores/produtos/:produtoId/fornecedores`
- `GET /produto-fornecedores/fornecedores/:fornecedorId/produtos`

### Execução

```bash
npm install
npm run start:dev
```

### Testes

Importe o arquivo `insomnia/MyCode-insomnia.json` no Insomnia para testar as rotas.
