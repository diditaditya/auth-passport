# auth-passport

auth-passport is example of local-passport implementation in sign-in.

## Routes

Use the following routes to access the database:

| Routes | HTTP method | Description |
| ------ | ----------- | ----------- |
| /api/users | POST | Add a user to database |
| /api/signin | POST | Sign in using username and password |

## Usage

First install the dependencies and then start the server as follows:

```sh
$ npm install
$ npm start
```
The routes can be accessed via http://localhost:3000, recommended to be accessed via Postman etc. If successfully sign-in, a token will be returned.
