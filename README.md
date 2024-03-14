<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

MVC _(Model-View-Controller)_ backend application that is a clone of **Medium.com**

## Installation and running the app

Clone the repository:

```bash
$ git clone https://github.com/gentlemil/mediumclone_nestjs.git
```

Switch to the repo folder:

```bash
cd mediumclone_nestjs
```

Install dependencies:

```bash
$ npm install
```

Run the application:

```bash
$ npm run start
```

Test api with `http://localhost:3000` in your favourite browser.
Swagger `http://localhost:3000/api`.

## Database

The database I use is **Postgresql** _(docs: https://www.postgresql.org/)_ and **TypeORM** _(docs: https://typeorm.io/)_ to host it in NestJS.

Create a new database locally on the device you're using _(e.g. 'mediumclone')_ , and then pass references to it in a file _ormconfig.ts_

```bash
const config: PostgresConnectionOptions = {
type: 'postgres',
host: 'localhost',
port: 5432,
username: <db_username_name>,
password: <db_password>,
database: <db_name>,
entities: [__dirname + '/**/*.entity{.ts,.js}'],
synchronization: false,
migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};
```

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

```bash
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
```

Authentication required, returns the Article
No additional parameters required

**13. Get Profile:**

```bash
GET /api/profiles/:username
```

Authentication optional, returns a Profile

**14. Follow user:**

```bash
POST /api/profiles/:username/follow
```

Authentication required, returns a Profile
No additional parameters required

**15. Unfollow user:**

```bash
DELETE /api/profiles/:username/follow
```

Authentication required, returns a Profile
No additional parameters required

**16. Feed Articles:**

```bash
GET /api/articles/feed
```

Can also take limit and offset query parameters like List Articles (check below):

```bash
{
  "articles":[{
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
  }, {
    "slug": "how-to-train-your-dragon-2",
    "title": "How to train your dragon 2",
    "description": "So toothless",
    "body": "It a dragon",
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
  }],
  "articlesCount": 2
}
```

Authentication required, will return multiple articles created by followed users, ordered by most recent first.

**17. Get Tags:**

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

**18. Create comment:**

```bash
GET /api/articles/:slug/comments/add
```

Example request body:

```bash
{
  "comment": {
    "content": "My first comment."
  }
}
```

Authentication required, returns created comment
All fields required

Response format:

```bash
{
  "comment": {}
}
```

**19. Get comments:**

```bash
GET /api/articles/:slug/comments/
```

No authentication required, returns comments related to the article

Response format:

```bash
{
  "comments": [],
  "commentsCounts": 0
}

```

**20. Delete comment:**

```bash
GET /api/articles/:slug/comments/:id
```

Authentication required.

## Error Handling

If a request fails any validations, expect a 422 and errors in the following format:

```bash
{
  "errors":{
    "body": [
      "can't be empty"
    ]
  }
}
```

Other status codes:

```bash
401 - for Unauthorized requests, when a request requires authentication but it isn't provided
403 - for Forbidden requests, when a request may be valid but the user doesn't have permissions to perform the action
404 - for Not found requests, when a resource can't be found to fulfill the request
```

## License

Nest is [MIT licensed](LICENSE).
