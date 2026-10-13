import { test, expect } from '@playwright/test';

interface CreatePostRequest {
  userId: number;
  title: string;
  body: string;
}

type EchoResponse<T> = Partial<T> & { id: number } & Record<string, unknown>;

test('POST /posts - creates a post successfully', async ({ request }) => {
  const requestBody: CreatePostRequest = {
    userId: 2,
    title: 'This is my first API request JSON',
    body: 'Learning Playwright API automation',
  };

  const response = await request.post('/posts', { data: requestBody });

  expect(response.status()).toBe(201);
  expect(response.ok()).toBeTruthy();
  expect(response.headers()['content-type']).toContain('application/json');

  const body = (await response.json()) as EchoResponse<CreatePostRequest>;

  expect(typeof body.id).toBe('number');
  expect(body.id).toBeGreaterThan(0);
  expect(body.userId).toBe(requestBody.userId);
  expect(body.title).toBe(requestBody.title);
  expect(body.body).toBe(requestBody.body);
});

test('POST /posts - missing title is echoed back without title', async ({ request }) => {
  const requestBody: Omit<CreatePostRequest, 'title'> = {
    userId: 3,
    body: 'Testing a missing title',
  };

  const response = await request.post('/posts', { data: requestBody });
  expect(response.status()).toBe(201);

  const body = (await response.json()) as EchoResponse<CreatePostRequest>;

  expect(typeof body.id).toBe('number');
  expect(body.userId).toBe(requestBody.userId);
  expect(body.body).toBe(requestBody.body);
  expect('title' in body).toBe(false);
});

test('POST /posts - empty title is echoed back as empty string', async ({ request }) => {
  const requestBody: CreatePostRequest = {
    userId: 3,
    title: '',
    body: 'Testing an empty title',
  };

  const response = await request.post('/posts', { data: requestBody });
  expect(response.status()).toBe(201);

  const body = (await response.json()) as EchoResponse<CreatePostRequest>;

  expect(typeof body.id).toBe('number');
  expect(body.userId).toBe(requestBody.userId);
  expect(body.title).toBe('');
  expect(body.body).toBe(requestBody.body);
});

test('POST /posts - missing userId is echoed back without userId', async ({ request }) => {
  const requestBody: Omit<CreatePostRequest, 'userId'> = {
    title: 'Testing missing userId',
    body: 'userId is intentionally omitted',
  };

  const response = await request.post('/posts', { data: requestBody });
  expect(response.status()).toBe(201);

  const body = (await response.json()) as EchoResponse<CreatePostRequest>;

  expect(typeof body.id).toBe('number');
  expect(body.title).toBe(requestBody.title);
  expect(body.body).toBe(requestBody.body);
  expect('userId' in body).toBe(false);
});

test('POST /posts - extra field is echoed back', async ({ request }) => {
  const requestBody = {
    userId: 1,
    title: 'Testing an extra field',
    body: 'Checking how the API handles additional properties',
    extrafield: 'extra value',
  };

  const response = await request.post('/posts', { data: requestBody });
  expect(response.status()).toBe(201);

  const body = (await response.json()) as EchoResponse<typeof requestBody>;

  expect(typeof body.id).toBe('number');
  expect(body.userId).toBe(requestBody.userId);
  expect(body.title).toBe(requestBody.title);
  expect(body.body).toBe(requestBody.body);
  expect(body.extrafield).toBe(requestBody.extrafield);
});

test('POST /posts - empty body is accepted and returns only id', async ({ request }) => {
  const requestBody: Partial<CreatePostRequest> = {};

  const response = await request.post('/posts', { data: requestBody });
  expect(response.status()).toBe(201);

  const body = (await response.json()) as EchoResponse<CreatePostRequest>;

  expect(typeof body.id).toBe('number');
  expect(body.id).toBeGreaterThan(0);
  expect('userId' in body).toBe(false);
  expect('title' in body).toBe(false);
  expect('body' in body).toBe(false);
});

test('POST /posts - string userId is echoed back as string (no validation)', async ({ request }) => {
  const requestBody = {
    userId: '2', // deliberately wrong type
    title: 'Testing an invalid data type',
    body: 'userId is sent as a string',
  };

  const response = await request.post('/posts', { data: requestBody });
  expect(response.status()).toBe(201);

  const body = (await response.json()) as EchoResponse<typeof requestBody>;

  expect(body.userId).toBe('2');
  expect(body.title).toBe(requestBody.title);
  expect(body.body).toBe(requestBody.body);
});