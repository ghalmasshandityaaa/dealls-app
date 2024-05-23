# Backend Dating App API

## Flow Application

![plot](./assets/flow.png)

## Stack

This backend Dating App API is built using a robust stack to ensure efficiency, scalability, and ease of development. Here's a breakdown of the stack components:

- **Framework:** [Nestjs](https://nestjs.com/) - A progressive Node.js framework for building efficient and scalable server-side applications.
- **Database:**
  - **Primary:** [Postgres](https://www.postgresql.org/) - An advanced, enterprise-class open-source relational database system with a strong reputation for reliability, feature robustness, and performance.
  - **Caching:** [Redis](https://redis.io/) - Redis is an open-source, in-memory data structure store used as a database, cache, and message broker.
- **ORM:** [TypeOrm](https://typeorm.io/) - An ORM that allows developers to work with databases using TypeScript or JavaScript, providing support for multiple database types and seamless database migrations.
- **Validation:** [Joi](https://joi.dev/) - A powerful schema description language and data validator for JavaScript, enabling robust validation of data inputs.
- **Logging:** [Pino](https://getpino.io/) - A super fast, highly efficient logging library for Node.js applications, ensuring optimal performance in logging activities.
- **Runtime:** [NodeJS](https://nodejs.org/en) - A JavaScript runtime built on Chrome's V8 JavaScript engine, enabling server-side scripting and development with high performance and scalability.
- **Tokenization:** [JWT](https://jwt.io/) - A compact, URL-safe means of representing claims to be transferred between two parties, widely used for securing API authentication.
- **Test:** [Jest](https://jestjs.io/) - A delightful JavaScript testing framework with a focus on simplicity, providing a rich API for writing various types of tests.
- **Security:** [Helmet](https://helmetjs.github.io/) - Middleware that helps secure Express/Node.js applications by setting various HTTP headers, protecting against well-known web vulnerabilities.
- **Command Query Responsibility Segregation (CQRS):** [CQRS](https://docs.nestjs.com/recipes/cqrs) - A design pattern that separates read and write operations, increasing performance, scalability, and security by isolating different parts of the system.
- **Rate Limiter:** [Throttle](https://www.npmjs.com/package/express-rate-limit) - Middleware to limit repeated requests to public APIs and/or endpoints, protecting against denial-of-service attacks.
- **Domain-Driven Design:** [DDD](https://www.dddcommunity.org/) - A methodology for designing complex software by reflecting real-world systems and concepts, ensuring the software structure matches business requirements.
- **Event Sourcing:** [Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html) - A pattern in which changes to application state are stored as a sequence of events, allowing for complete traceability and reconstruction of application state.

## Tooling

To facilitate development, the following tools are used:

- **Builder:** [ESBuild](https://esbuild.github.io/) - An extremely fast JavaScript and TypeScript bundler.
- **Linter:** [ESLint](https://eslint.org) - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
- **Formatting:** [Prettier](https://prettier.io/) - An opinionated code formatter that enforces a consistent style by parsing your code and re-printing it.
- **Type-Checking:** [TSC](https://www.typescriptlang.org/docs/handbook/compiler-options.html) - TypeScript Compiler, used to ensure type safety and catch errors early in the development process.
- **Package Manager:** [yarn](https://yarnpkg.com/) - A fast, reliable, and secure dependency management tool that provides deterministic dependency resolution, efficient caching, and parallel installation to streamline the development workflow.
- **Standardization:** [Conventional + Husky](https://github.com/conventional-changelog/commitlint) - A tool to enforce conventional commit messages and Git hooks.

## Available API Endpoints

Explore the suite of APIs offered by our dating app, each designed to provide a seamless and engaging user experience. Here's a rundown of the available endpoints:

- **User Authentication:**
  - **Sign Up:** `POST 'api/auth/signup'`  
    Register a new user account with essential details to start using the app.
  - **Login:** `POST 'api/auth/login'`  
    Authenticate existing users, allowing them to access their account and start matching.
- **Packages:**
  - **Purchase Package:** `POST 'api/packages/purchase'`  
    Buy premium packages that provide benefits like unlimited swipes or a verified user label.
- **User Interactions:**
  - **Like User:** `POST 'api/users/:id/like'`  
    Express interest in another user by liking their profile.
  - **Pass User:** `POST 'api/users/:id/pass'`  
    Skip a user’s profile if you're not interested in connecting with them.
  - **Get Random User:** `GET 'api/users/random'`  
    Discover a random user profile to keep the dating experience fresh and exciting. Note: Each user profile will only be shown once per day.

## Installing Dependencies

To install the required dependencies for this project, use the following command:

```sh
yarn install
```

This command will install all the necessary packages as specified in the package.json file.

## Starting the Server

To start the server, use the following command:

```sh
yarn start # or yarn start:prod for start the production server
```

## Building the Server

To build the server, you can use the following command:

```sh
yarn build
```

## Running Unit Tests

Ensure Your Code's Reliability and Correctness:

```sh
yarn test
```

## Create Migrations

To create a migration file

```bash
$ yarn migration:create <migration-name>
```

And move it inside the corresponding service's migration folder: `migrations/*`

Add your migration to the `index.ts` (eg. `migrations/index.ts`)

## Create Seeder

To create a seeds file (must with prefix `seed-*`)

To create a seeder factory file (must with prefix `seed.<factory-name>.factory.ts`)

```bash
$ yarn migration:create seed-<seed-name>
```

And move seed inside the corresponding service's seed folder: `src/database/seeds/index.ts`
Add your migration to the `index.ts` (eg. `seeds/index.ts`)

Rule:

- If your seeder uses constant data, please create a factory first
- If you used factory files to store data, migrate them back for deletion (`down/revert code`)
- If you don't use factory files, you can ignore the migration code back
- If you use another module for seed data (eg. `StringUtils`), you must adjust path declaration with (eg. `../../../common/utils`) instead of (eg. `src/common`)

## Execute Migrations

Make sure you ONLY run the migrations/seed on your local database.

```.env
# make sure .env has the following
PG_DATABASE_URL=postgres://postgres:postgres@localhost:5432/<your-local-database-name>
```

To show the migrations/seed

```
$ yarn migration:show
```

And then run the migration/seed

```
$ yarn migration:run
```

The cloud environment database migrations will be run via CI/CD.

## Stay in touch

- Ghalmas Shanditya Putra Agung - [Github](https://github.com/ghalmasshandityaaa)

## Postman Collection

Link: [download](https://drive.google.com/file/d/1d0dmN6mkY5sEpMQq8Yu1Hayxa3_8TRYb/view?usp=sharing)
