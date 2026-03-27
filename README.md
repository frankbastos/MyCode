FACULDADE GRAN (https://faculdade.grancursosonline.com.br/)

Projeto Disciplina Projeto Integrador

## API

Backend em NestJS com SQLite para testes locais.

### Endpoints

- `POST /products`
- `GET /products`
- `GET /products/:id`
- `PATCH /products/:id`
- `DELETE /products/:id`
- `POST /suppliers`
- `GET /suppliers`
- `GET /suppliers/:id`
- `PATCH /suppliers/:id`
- `DELETE /suppliers/:id`
- `POST /product-suppliers`
- `DELETE /product-suppliers/:productId/:supplierId`
- `GET /product-suppliers/products/:productId/suppliers`
- `GET /product-suppliers/suppliers/:supplierId/products`

### Execucao

```bash
npm install
npm run start:dev
```

### Testes

Importe o arquivo `insomnia/MyCode-insomnia.json` no Insomnia para testar as rotas.
