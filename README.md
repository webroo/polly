<p align="center">
  <a href="https://polly-poll.vercel.app">
    <img src="public/parrot.png" alt="A green cartoon parrot smiling and waving a wing." width="100" height="100">
  </a>
</p>
<p align="center">A polling app for scheduling events.</p>

## Description

Polly is a simple and easy to use polling app that helps you schedule events - Decide what you want to organise, suggest some dates, then let participants vote on the options that work best for them.

[Try it out for yourself](https://polly-poll.vercel.app)

## Background

An experiment in using [React Server Components](https://vercel.com/blog/understanding-react-server-components) and [Server Actions](https://vercel.com/blog/understanding-react-server-components#server-actions-react%E2%80%99s-first-steps-into-mutability). Built using [Next.js](https://nextjs.org/) and [MongoDB](https://www.mongodb.com/).

Server Components and Sever Actions allow the site to be fully functional even with JavaScript disabled.

## Prerequisites

- Node 18 (preferably via [nvm](https://github.com/nvm-sh/nvm))
- Docker (for local MongoDB)

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
