# node-crud-api

node-crud-api

### Prerequisites

1. Use 22.x.x version (22.9.0 or upper) of Node.js
2. Install dependencies

```bash
$ npm i
```

1. Value of `port` on which application is running should is stored in `.env` file

### Scripts

```bash
# start development
$ npm run start

# start production
$ npm run start:prod
```

## Details

### API

1. Endpoint `api/users`:

   - **GET** `api/users` is used to get all persons
     - Server should answer with `status code` **200** and all users records
   - **GET** `api/users/{userId}`
     - Server should answer with `status code` **200** and record with `id === userId` if it exists
     - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
     - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
   - **POST** `api/users` is used to create record about new user and store it in database
     - Server should answer with `status code` **201** and newly created record
     - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
   - **PUT** `api/users/{userId}` is used to update existing user
     - Server should answer with` status code` **200** and updated record
     - Server should answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
     - Server should answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
   - **DELETE** `api/users/{userId}` is used to delete existing user from database
     - Server should answer with `status code` **204** if the record is found and deleted
     - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
     - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

2. Requests to non-existing endpoints (e.g. `some-non/existing/resource`) should be handled (server should answer with `status code` **404** and corresponding human-friendly message)
3. Errors on the server side that occur during the processing of a request should be handled and processed correctly (server should answer with `status code` **500** and corresponding human-friendly message)

### Entity

- `id` — unique identifier (`string`, `uuid`) generated on server side
- `username` — user's name (`string`, **required**)
- `age` — user's age (`number`, **required**)
- `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)
