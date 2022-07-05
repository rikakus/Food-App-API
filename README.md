<h3 align="center">Food App API</h3>
<p align="center">
  <a href="https://foodrecipe-app-api.herokuapp.com/">View API Demo</a>
  ·
  <a href="https://github.com/rikakus/Food-App-API/issues">Report Bug</a>
  <br />
</p>

<!-- ABOUT THE PROJECT -->
## About The Project

This is a Restful API repository for Food Recipe. This Restful API is built using ExpressJS and PostgreSQL.

### Technology Used

- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)

## Getting Started

### Installation

- Clone this project with `git clone https://github.com/rikakus/Food-App-API`
- Install package required with `npm install`
- Setting .env

```bash

PORT=
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
DB_PORT=
NODE_ENV=
JWT_SECRET=
```

### Executing program

- Run program with `npm run dev` for development and `npm run start` for production

## Endpoint List

### Admin

| Method | API     | Description                       |
| :-------- | :------- |:-------------------------------- |
| `put`      | `/recipe-suspend/:id` | suspend recipe |
| `put`      | `/users-suspend/:id` | suspend recipe |
| `get`      | `/users` | get all user |

### User

#### Auth

| Method | API     | Description                       |
| :-------- | :------- |:-------------------------------- |
| `post`      | `/register` | user register |
| `post`      | `/login` | user login |

#### Account

| Method | API     | Description                       |
| :-------- | :------- |:-------------------------------- |
| `get`      | `/users/:id` | get detail user |
| `put`      | `/users/:id` | update data user |
| `delete`      | `/users/:id` | delete user |

#### Recipe

| Method | API     | Description                       |
| :-------- | :------- |:-------------------------------- |
| `get`      | `/recipe` | get all recipe |
| `get`      | `/recipe/:id` | get detail recipe |
| `post`      | `/recipe` | upload recipe |
| `put`      | `/recipe/:id` | update recipe |
| `delete`      | `/recipe/:id` | delete recipe |
| `get`      | `/public` | get recipe for public|
| `get`      | `/recipe-user/:id` | get user recipe |

#### Recipe

| Method | API     | Description                       |
| :-------- | :------- |:-------------------------------- |
| `get`      | `/comment` | get all comment |
| `get`      | `/comment/:id` | get detail comment |
| `post`      | `/comment` | upload comment |
| `put`      | `/comment/:id` | update comment |
| `delete`      | `/comment/:id` | delete comment |
| `get`      | `/commentrecipe/:id` | get comment for recipe|

<!-- RELATED PROJECT -->
## Related Project

- [Food App FrontEnd](https://github.com/rikakus/Front-End-With-Redux)
- [Food App Demo](https://food-recipe-rikakus.vercel.app/)

## License

This project is licensed under the MIT License - see the LICENSE file for details
