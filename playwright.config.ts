import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
 projects: [
  {
    name: 'jsonplaceholder',
    testMatch: /jsonplaceholder\/.*\.spec\.ts/,
    use: {
      baseURL:'https://jsonplaceholder.typicode.com',
      extraHTTPHeaders: { Accept: 'application/json' },
    },
  },
  {
    name: 'restful-booker',
    testMatch: /restful-booker\/.*\.spec\.ts/,
    use: {
      baseURL: 'https://restful-booker.herokuapp.com',
        extraHTTPHeaders: { Accept: 'application/json' },
    },
  },
 ],
});