import { test, expect } from '@playwright/test';

interface PostResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

test('GET /posts/1 - returns a valid post', async ({ request }) => {
  const response = await request.get('/posts/1');

  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();
  expect(response.headers()['content-type']).toContain('application/json');

  const post = (await response.json()) as PostResponse;

  expect(post.id).toBe(1);
  expect(post.userId).toBe(1);
  expect(typeof post.title).toBe('string');
  expect(post.title.length).toBeGreaterThan(0);
  expect(typeof post.body).toBe('string');
  expect(post.body.length).toBeGreaterThan(0);
});

test('GET /posts/99999 - returns 404 for non-existent post', async ({ request }) => {
  const response = await request.get('/posts/99999');

  expect(response.status()).toBe(404);
});

test('GET /posts?userId=1 - filters posts by userId', async ({ request }) => {
  const response = await request.get('/posts', {
    params: { userId: 1 },
  });

  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  const posts = (await response.json()) as PostResponse[];

  expect(Array.isArray(posts)).toBe(true);
  expect(posts.length).toBeGreaterThan(0);

  for (const post of posts) {
    expect(post.userId).toBe(1);
    expect(typeof post.id).toBe('number');
    expect(post.id).toBeGreaterThan(0);
    expect(typeof post.title).toBe('string');
    expect(post.title.length).toBeGreaterThan(0);
    expect(typeof post.body).toBe('string');
    expect(post.body.length).toBeGreaterThan(0);
  }
});