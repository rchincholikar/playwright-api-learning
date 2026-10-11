# Playwright API Automation — Learning Notes

## 1. Learning Objective

Learn API automation using Node.js, TypeScript, and Playwright, progressing from basic REST API tests to professional automation frameworks and AI-powered API testing.

## 2. Technology Overview

| Technology | Purpose |
|---|---|
| Node.js | Runs JavaScript outside the browser. |
| npm | Installs and manages project dependencies. |
| TypeScript | Adds static typing to JavaScript. |
| Playwright Test | Runs automated tests and provides API request and assertion functionality. |
| Git | Tracks code and documentation changes. |
| GitHub | Hosts repositories and supports collaboration. |

## 3. Install Node.js and npm

Download Node.js:

https://nodejs.org/en/download

Verify the installation:

```bash
node --version
npm --version
```

npm is installed with Node.js.

## 4. Create the Project

Run these commands:

```bash
mkdir playwright-api-learning
cd playwright-api-learning
npm init -y
```

| Command | Purpose |
|---|---|
| `mkdir playwright-api-learning` | Creates the project directory. |
| `cd playwright-api-learning` | Moves into the directory. |
| `npm init -y` | Creates `package.json` with default values. |

### Important project files

- `package.json` — project information, dependencies, and scripts.
- `package-lock.json` — records the resolved dependency tree for more reproducible installations.
- `node_modules/` — contains installed packages; do not commit this folder.
- `tsconfig.json` — TypeScript compiler configuration.
- `tests/` — contains automated test files.
- `docs/` — contains learning notes and documentation.

## 5. Install Dependencies

Run:

```bash
npm install -D @playwright/test typescript @types/node
```

| Package | Purpose |
|---|---|
| `@playwright/test` | Provides the test runner, assertions, and API testing support. |
| `typescript` | Provides TypeScript compilation and type checking. |
| `@types/node` | Provides type definitions for Node.js APIs. |

The `-D` option installs packages as development dependencies.

## 6. Configure TypeScript

Create `tsconfig.json` in the project root:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "node16",
    "moduleResolution": "node16",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "types": ["node"]
  },
  "include": ["tests/**/*.ts"]
}
```

### Configuration explained

- `target`: JavaScript language version to emit.
- `module`: module format used by the compiler.
- `moduleResolution`: how imported modules are located.
- `strict`: enables stronger type checking.
- `esModuleInterop`: improves interoperability with CommonJS modules.
- `skipLibCheck`: skips checking declaration files from dependencies.
- `types`: includes Node.js type definitions.
- `include`: identifies TypeScript files under `tests/`.

## 7. First API Automation Test

Create `tests/first-api.spec.ts`:

```typescript
import { test, expect } from "@playwright/test";

test("Get a post successfully", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/posts/1"
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBe(1);
  expect(body.title).toBeTruthy();
});
```

### What does the test do?

1. Imports Playwright's `test` and `expect`.
2. Defines an asynchronous test.
3. Sends a GET request to the practice API.
4. Verifies that the status code is `200`.
5. Parses the JSON response.
6. Checks the post ID and title.

### Run the test

```bash
npx playwright test tests/first-api.spec.ts
```

Run all tests:

```bash
npx playwright test
```

Check TypeScript types:

```bash
npx tsc --noEmit
```

## 8. TypeScript Learning Topics

- [x] Variables and basic types.
- [x] Arrays and typed arrays.
- [x] Union types.
- [x] Interfaces and object structures.
- [x] API response typing.
- [x] Assertions and expected values.
- [x] Request builders and reusable functions.
- [x] Runtime validation versus compile-time types.
- [x] Introduction to authentication and authorization.

### Important concept

A TypeScript assertion such as:

```typescript
const body = await response.json() as PostResponse;
```

does not validate the actual response at runtime. It only tells TypeScript how the value is intended to be treated. Use runtime checks or schema validation to verify real API data.

## 9. Playwright Learning Roadmap

### Phase 1: Fundamentals

- [x] Install Node.js, npm, TypeScript, and Playwright Test.
- [x] Create the project and TypeScript configuration.
- [x] Execute the first GET API test.
- [x] Validate status codes and response fields.
- [ ] Practise typed API responses using interfaces.
- [ ] Write GET tests for different resource IDs.
- [ ] Write POST requests and validate responses.
- [ ] Practise negative tests and error handling.
- [ ] Create reusable assertion functions.

### Phase 2: Professional API Automation Framework

- [ ] Create reusable API clients.
- [ ] Separate test data, configuration, and assertions.
- [ ] Add authentication and environment configuration.
- [ ] Add positive, negative, and boundary tests.
- [ ] Implement setup and cleanup.
- [ ] Add reporting.
- [ ] Integrate GitHub Actions CI.

### Phase 3: AI-Powered API Testing

- [ ] Call an LLM API.
- [ ] Manage API keys securely.
- [ ] Validate structured AI responses.
- [ ] Generate candidate test cases from API specifications.
- [ ] Evaluate AI output for correctness and consistency.
- [ ] Test failure cases and unpredictable model responses.

AI-generated test cases must be reviewed and validated before being trusted.

## 10. Three Portfolio Projects

### Project 1 — playwright-api-learning

**Goal:** Learn TypeScript and Playwright API testing fundamentals.

Focus on GET and POST requests, assertions, response validation, and asynchronous programming.

### Project 2 — playwright-api-framework

**Goal:** Build a maintainable, reusable API automation framework.

Focus on API clients, test data, authentication, negative testing, configuration, and reporting.

### Project 3 — ai-api-testing-lab

**Goal:** Practise AI-assisted API testing.

Focus on LLM integration, structured output validation, test-case generation, and AI output evaluation.

## 11. GitHub Documentation Workflow

After making changes:

```bash
git status
git add README.md docs/playwright-api-learning.md
git commit -m "Add Playwright API learning documentation"
git push
```

- `git status` shows changed files.
- `git add` stages selected files.
- `git commit` records the changes.
- `git push` uploads committed changes to GitHub.

## 12. Security Best Practices

- Never commit passwords, API tokens, or private keys.
- Exclude `.env` files from Git.
- Do not commit `node_modules/`.
- Commit `package.json` and `package-lock.json`.
- Never publish confidential company source code, internal endpoints, or customer data.

## 13. Learning Method

For each new topic:

1. Understand the concept.
2. Write the code yourself.
3. Run the test.
4. Understand the output.
5. Change one thing and run it again.
6. Document the lesson and mark it complete.

**Long-term objective:** Build strong API automation skills and demonstrate professional framework design, CI practices, and practical AI testing on GitHub.
