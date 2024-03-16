<h1 align="center">Storesy Orders API</h1>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=ac7c59&labelColor=4b2428">
</p>

## 💻 Projeto

Sistema para criação de pedidos.

## 🧪 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [MySQL](https://www.mysql.com/)
- [Prisma](https://www.prisma.io/)
- [Zod](https://zod.dev/)

## 🚀 Como executar

```bash
# Clone este repositório
$ git clone https://github.com/jhonathanalencar/storesy-orders.git

# Entre na pasta
$ cd storesy-orders

# Instale as dependências
$ npm install

# Copie e preencha as variáveis de ambiente do arquivo .env.example em um arquivo .env

# Crie e inicie os containers
$ docker compose up

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# A aplicação inciará na porta:4000
acesse <http://localhost:4000>
```

## Rotas da aplicação

### Product

- [x] GET `/products`

  List products

- [x] POST `/products`

  Create product

- [x] GET `/products/:id`

  Get product by ID

- [x] PATCH `/products/:id`

  Update product

- [x] DELETE `/products/:id`

  Delete product

### Order

- [x] GET `/orders`

  List orders

- [x] POST `/orders`

  Create order

- [x] GET `/orders/:id`

  Get order by ID

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">
  <img src="https://user-images.githubusercontent.com/87830705/254344973-58fb1280-be15-4847-95bd-c99236abdb4b.png" width="5%">
</p>
