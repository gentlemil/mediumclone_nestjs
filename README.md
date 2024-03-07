<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Installation

```bash
$ npm install
```

## Running the app

```bash

$ git clone https://github.com/gentlemil/mediumclone_nestjs.git

$ npm install

# development
$ npm run start

```

## License

Nest is [MIT licensed](LICENSE).

## Description

In progress...
Until then for more information click here: https://realworld-docs.netlify.app/docs/intro

## API Documentation - Endpoints

Authentication Header:
You can read the authentication header from the headers of the request

```bash
Authorization: Token jwt.token.here
```

**1. Authentication:**

```bash
POST /api/users/login
```

Example request body:

```bash
{
  "user":{
    "email": "jake@jake.jake",
    "password": "jakejake"
  }
}
```

No authentication required, returns a User
Required fields: email, password

**2. Registration:**

```bash
POST /api/users
```

Example request body:

```bash
{
  "user":{
    "username": "Jacob",
    "email": "jake@jake.jake",
    "password": "jakejake"
  }
}
```

and example request response:

```bash
 {
  "user": {
    "email": "jake@jake.jake",
    "token": "jwt.token.here",
    "username": "jake",
    "bio": "I work at statefarm",
    "image": null
  }
```

No authentication required, returns a User
Required fields: email, username, password

and example request response:

```bash
{
  "user": {
    "email": "jake@jake.jake",
    "token": "jwt.token.here",
    "username": "jake",
    "bio": "I work at statefarm",
    "image": null
  }
}
```

**3. Authentication:**

```bash
POST /api/users/login
```

Example request body:

```bash
{
  "user":{
    "email": "jake@jake.jake",
    "password": "jakejake"
  }
}
```

No authentication required, returns a User
Required fields: email, password

**x. Get Tags:**

```bash
GET /api/tags
```

No authentication required, returns a List of Tags

Response format:

```bash
{
  "tags": [
    "reactjs",
    "angularjs"
  ]
}
```
