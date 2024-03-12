<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Installation and running the app

```bash

$ git clone https://github.com/gentlemil/mediumclone_nestjs.git

$ npm install

# development
$ npm run start

```

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

**4. Update User:**

```bash
PUT /api/user
```

Example request body:

```bash
{
  "user":{
    "email": "jake@jake.jake",
    "bio": "I like to skateboard",
    "image": "https://i.stack.imgur.com/xHWG8.jpg"
  }
}
```

Authentication required, returns the User:

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

Accepted fields: email, username, password, image, bio

**5. Get Profile:**

```bash
GET /api/profiles/:username
```

Authentication optional, returns a Profile:

```bash
{
  "profile": {
    "username": "jake",
    "bio": "I work at statefarm",
    "image": "https://api.realworld.io/images/smiley-cyrus.jpg",
    "following": false
  }
}
```

**6. Create Article:**

```bash
POST /api/articles
```

Example request body:

```bash
{
  "article": {
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "You have to believe",
    "tagList": ["reactjs", "angularjs", "dragons"]
  }
}
```

Authentication required, will return an:

```bash
{
  "article": {
    "slug": "how-to-train-your-dragon",
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "It takes a Jacobian",
    "tagList": ["dragons", "training"],
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:48:35.824Z",
    "favorited": false,
    "favoritesCount": 0,
    "author": {
      "username": "jake",
      "bio": "I work at statefarm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }
}
```

Required fields: title, description, body
Optional fields: tagList as an array of Strings

**7. Get Article:**

```bash
GET /api/articles/:slug
```

No authentication required, will return single article:

```bash
{
  "article": {
    "slug": "how-to-train-your-dragon",
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "It takes a Jacobian",
    "tagList": ["dragons", "training"],
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:48:35.824Z",
    "favorited": false,
    "favoritesCount": 0,
    "author": {
      "username": "jake",
      "bio": "I work at statefarm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }
}
```

**8. Delete Article:**

```bash
DELETE /api/articles/:slug
```

Authentication required.

**9. Update Article:**

```bash
PUT /api/articles/:slug
```

Example request body:

```bash
{
  "article": {
    "title": "Did you train your dragon?"
  }
}
```

Authentication required, returns the updated Article
All fields required

**10. List Articles (get all):**

```bash
GET /api/articles
```

Returns most recent articles globally by default, provide tag, author or favorited query parameter to filter results

Query Parameters:

````bash
Filter by tag: `?tag=AngularJS`
Filter by author: `?author=jake`
Favorited by user: `?favorited=jake`
Limit number of articles (default is 20): `?limit=20`
Offset/skip number of articles (default is 0): `?offset=0`
```

Authentication optional, will return multiple articles, ordered by most recent first

**11. Favorite Article:**
```bash
POST /api/articles/:slug/favorite
```

Authentication required, returns the Article
No additional parameters required

**12. Unfavorite Article:**
```bash
DELETE /api/articles/:slug/favorite
bash

Authentication required, returns the Article
No additional parameters required

**13. :**

**x. Get Tags:**

```bash
GET /api/tags
````

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

## License

Nest is [MIT licensed](LICENSE).
