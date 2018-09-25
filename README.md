# A complete REST API with Loopback

Before running and testing API, run `npm install` to install all node modules, and `npm run gen:DB` to generate new db file after clearing data in persistance db.

## API Documentation

![API Explorer](https://raw.githubusercontent.com/imshubhamsingh/loopback-api/master/screenshots/api-end-points.png)

## Development server

Run `npm run dev:server` for a 💻 dev server. Navigate to `http://localhost:3000/explore` for 📖 API documentation. The API will automatically reload if you change any of the source files.

To enable mail sending function, add mialGun domain name and api key to `dev` environment in `server/env/.env.dev`

```
  apiKey=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  domain=sandboxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.mailgun.org
  adminEmail=test@example.com
```

###### Note: The mail sending function will work only in `dev` and `prod` environment

## Tesing

### Unit Tests

Run `npm run test:server` for a 💻 test server, then for unit test run below commands:

- `npm run test:unit` to run unit test
- `npm run test:coverage` to run test coverage
