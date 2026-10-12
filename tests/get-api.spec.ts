
import { test, expect } from "@playwright/test";

const baseUrl = "https://jsonplaceholder.typicode.com/posts";

interface PostResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

test("GET - valid post returns correct data", async ({ request }) => {
  const response = await request.get(`${baseUrl}/1`);

  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  const headers = response.headers();
  expect(headers["content-type"]).toContain("application/json");

  const responseBody: PostResponse = await response.json();

  console.log(
    "===== VALID GET RESPONSE =====",
    JSON.stringify(responseBody, null, 2)
  );

  expect(responseBody.id).toBe(1);
  expect(responseBody.userId).toBe(1);

  expect(typeof responseBody.title).toBe("string");
  expect(responseBody.title.length).toBeGreaterThan(0);

  expect(typeof responseBody.body).toBe("string");
  expect(responseBody.body.length).toBeGreaterThan(0);
});

test("GET - non-existent post returns 404", async ({ request }) => {
  const response = await request.get(`${baseUrl}/99999`);

  expect(response.status()).toBe(404);
});

test("GET - filter posts by userId", async ({ request }) => {
  const response = await request.get(`${baseUrl}?userId=1`);

  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  const responseBody: PostResponse[] = await response.json();

  console.log(
    "===== FILTERED GET RESPONSE =====",
    JSON.stringify(responseBody, null, 2)
  );

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);

  for (let i = 0; i < responseBody.length; i += 1) {
    expect(responseBody[i].userId).toBe(1);

    expect(typeof responseBody[i].id).toBe("number");
    expect(responseBody[i].id).toBeGreaterThan(0);

    expect(typeof responseBody[i].title).toBe("string");
    expect(responseBody[i].title.length).toBeGreaterThan(0);

    expect(typeof responseBody[i].body).toBe("string");
    expect(responseBody[i].body.length).toBeGreaterThan(0);
  }
});
