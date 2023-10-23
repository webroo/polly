## Getting Started

1. Use [nvm](https://github.com/nvm-sh/nvm) to load the correct version of Node for the project:

    `nvm use`

2. Install dependencies:

    `npm install`

3. Create a copy of the example local .env file:

    `cp .env.local.example .env.local`

4. Start MongoDB via Docker:

    `docker compose up`

5. Run the development server:

    `npm run dev`

6. Open [http://localhost:3000](http://localhost:3000) to see the site.

## MongoDB admin interface

Docker compose also provides Mongo Express, a web-based MongoDB admin interface. It can be found at [http://localhost:8081/](http://localhost:8081/) and can be logged into with the following credentials:

Username: `admin`  
Password: `pass`

## Configure ESLint and Prettier in VSCode

VSCode can be configured to automatically fix and format files on save by adding the following settings to VSCode:

```
"eslint.run": "onType",
"eslint.validate": [
  "javascript",
  "javascriptreact",
  "typescript",
  "typescriptreact"
],
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true,
},
```

Note: In this project Prettier is run _through_ ESLint, so you don't need to have the Prettier VSCode extension installed.
