# Playwright API Learning

A hands-on learning project for building API automation skills using **Node.js, TypeScript, and Playwright**.

## Project Objectives

- Learn TypeScript fundamentals through practical exercises.
- Automate REST API tests using Playwright.
- Validate HTTP status codes, response bodies, and API behavior.
- Build reusable API clients, test data, and assertion utilities.
- Learn authentication, negative testing, and API test reporting.
- Explore AI-powered API testing and test-case generation.

## Technology Stack

- **Node.js** — JavaScript runtime.
- **npm** — package manager.
- **TypeScript** — typed programming language.
- **Playwright Test** — test runner, assertions, and API testing support.
- **Git and GitHub** — source control and project documentation.

## Prerequisites

Install Node.js from https://nodejs.org/en/download

Verify the installations:

```bash
node --version
npm --version
```

Git is also needed to upload the project to GitHub.

## Project Setup

Create the project folder and initialize npm:

```bash
mkdir playwright-api-learning
cd playwright-api-learning
npm init -y
```

Install the development dependencies:

```bash
npm install -D @playwright/test typescript @types/node
```

Create a `tsconfig.json` file and a `tests` folder.

## Run the API Tests

Run all Playwright tests:

```bash
npx playwright test
```

Run one specific test file:

```bash
npx playwright test tests/first-api.spec.ts
```

Run TypeScript type-checking:

```bash
npx tsc --noEmit
```

## Current Practice API

The initial exercises use JSONPlaceholder, a public practice API.

Example endpoint:

`https://jsonplaceholder.typicode.com/posts/1`

Example validations:

- HTTP status is `200`.
- The response contains the expected post ID.
- The title and body are present.

## Learning Roadmap

1. **Project 1 — playwright-api-learning:** TypeScript fundamentals, GET and POST tests, assertions, and response validation.
2. **Project 2 — playwright-api-framework:** Reusable API clients, test data, configuration, authentication, negative tests, and reporting.
3. **Project 3 — ai-api-testing-lab:** LLM API integration, structured-response validation, test-case generation, and AI output evaluation.

## Documentation

See [`docs/setup-and-learning-roadmap.md`](docs/setup-and-learning-roadmap.md) for detailed setup instructions, explanations, and the learning plan.

## Important Notes

- Do not commit `node_modules/`; npm can recreate it from the lockfile.
- Commit `package.json` and `package-lock.json`.
- Never commit passwords, API tokens, `.env` files, proprietary company code, or confidential test data.
