
import { test, expect } from "@playwright/test";

const baseUrl = "https://jsonplaceholder.typicode.com/posts";

interface CreatePostRequest {
  userId: number;
  title: string;
  body: string;
}

interface CreatePostRequestWithExtraField extends CreatePostRequest {
  extrfield : string
}

interface CreatePostResponse {
  id: number;
  userId?: number;
  title?: string;
  body?: string;
  extrfield?: string;
}

interface InvalidUserIdRequest {
  userId: string;
  title: string;
  body: string;
}

test("POST - create a post successfully", async ({ request }) => {
  const requestBody: CreatePostRequest = {
    userId: 2,
    title: "This is my first API request JSON",
    body: "Learning Playwright API automation"
  };

  console.log(
    "===== REQUEST BODY =====",
    JSON.stringify(requestBody, null, 2)
  );

  const response = await request.post(baseUrl, {
    data: requestBody
  });

  expect(response.status()).toBe(201);
  expect(response.ok()).toBeTruthy();

  const headers = response.headers();
  expect(headers["content-type"]).toContain("application/json");

  const responseBody: CreatePostResponse = await response.json();

  console.log(
    "===== RESPONSE BODY =====",
    JSON.stringify(responseBody, null, 2)
  );

  expect(typeof responseBody.id).toBe("number");
  expect(responseBody.id).toBeGreaterThan(0);

  expect(responseBody.userId).toBe(requestBody.userId);
  expect(responseBody.title).toBe(requestBody.title);
  expect(responseBody.body).toBe(requestBody.body);
});


//Deliberately made CreatePostRequest as Omit to remove title
test("POST - missing title", async ({ request }) => {
  const requestBody : Omit<CreatePostRequest, "title"> = {
    userId: 3,
    body: "Testing a missing title"
  };

  const response = await request.post(baseUrl, {
    data: requestBody
  });

  expect(response.status()).toBe(201);

  const responseBody: CreatePostResponse = await response.json();

  console.log(
    "===== MISSING TITLE RESPONSE =====",
    JSON.stringify(responseBody, null, 2)
  );

  expect(typeof responseBody.id).toBe("number");
  expect(responseBody.id).toBeGreaterThan(0);
  expect(responseBody.userId).toBe(requestBody.userId);
  expect(responseBody.body).toBe(requestBody.body);

  // The title should be absent from the echoed response.
  expect("title" in responseBody).toBe(false);
});

test("POST - empty title", async ({ request }) => {
  const requestBody : CreatePostRequest = {
    userId: 3,
    title: "",
    body: "Testing an empty title"
  };

  const response = await request.post(baseUrl, {
    data: requestBody
  });

  expect(response.status()).toBe(201);

  const responseBody: CreatePostResponse = await response.json();

  console.log(
    "===== EMPTY TITLE RESPONSE =====",
    JSON.stringify(responseBody, null, 2)
  );

  expect(typeof responseBody.id).toBe("number");
  expect(responseBody.id).toBeGreaterThan(0);
  expect(responseBody.userId).toBe(requestBody.userId);
  expect(responseBody.title).toBe("");
  expect(responseBody.body).toBe(requestBody.body);
});

//Deliberately made CreatePostRequest as Omit to remove userId
test("POST - missing userId", async ({ request }) => {
  const requestBody : Omit<CreatePostRequest,"userId"> = {
    title: "Testing missing userId",
    body: "userId is intentionally omitted"
  };

  const response = await request.post(baseUrl, {
    data: requestBody
  });

  expect(response.status()).toBe(201);

  const responseBody: CreatePostResponse = await response.json();

  console.log(
    "===== MISSING USERID RESPONSE =====",
    JSON.stringify(responseBody, null, 2)
  );

  expect(typeof responseBody.id).toBe("number");
  expect(responseBody.id).toBeGreaterThan(0);
  expect(responseBody.title).toBe(requestBody.title);
  expect(responseBody.body).toBe(requestBody.body);

  expect("userId" in responseBody).toBe(false);
});

test("POST - extra field in request", async ({ request }) => {
  const requestBody : CreatePostRequestWithExtraField = {
    userId: 1,
    title: "Testing an extra field",
    body: "Checking how the API handles additional properties",
    extrfield: "extra value"
  };

  const response = await request.post(baseUrl, {
    data: requestBody
  });

  expect(response.status()).toBe(201);

  const responseBody: CreatePostResponse = await response.json();

  console.log(
    "===== EXTRA FIELD RESPONSE =====",
    JSON.stringify(responseBody, null, 2)
  );

  expect(typeof responseBody.id).toBe("number");
  expect(responseBody.id).toBeGreaterThan(0);

  expect(responseBody.userId).toBe(requestBody.userId);
  expect(responseBody.title).toBe(requestBody.title);
  expect(responseBody.body).toBe(requestBody.body);
  expect(responseBody.extrfield).toBe(requestBody.extrfield);
});


//Deliberately made CreatePostRequest as partial to remove all fields
test("POST - empty request body", async ({ request }) => {
  const requestBody : Partial<CreatePostRequest> =  {};
  const response = await request.post(baseUrl, {
    data: requestBody
  });

  expect(response.status()).toBe(201);

  const responseBody: CreatePostResponse = await response.json();

  console.log(
    "===== EMPTY REQUEST RESPONSE =====",
    JSON.stringify(responseBody, null, 2)
  );

  expect(typeof responseBody.id).toBe("number");
  expect(responseBody.id).toBeGreaterThan(0);

  expect("userId" in responseBody).toBe(false);
  expect("title" in responseBody).toBe(false);
  expect("body" in responseBody).toBe(false);
});


test("POST - string instead of numeric userId", async ({ request }) => {
  // Intentionally invalid input: userId should normally be a number.
  const requestBody: InvalidUserIdRequest = {
    userId: "2",
    title: "Testing an invalid data type",
    body: "userId is sent as a string"
  };

  const response = await request.post(baseUrl, {
    data: requestBody
  });

  const rawBody = await response.text();

  console.log("===== WRONG DATA TYPE =====");
  console.log("Status:", response.status());
  console.log("Response:", rawBody);

  // JSONPlaceholder currently accepts this input.
  expect(response.status()).toBe(201);

  const responseBody: CreatePostResponse = JSON.parse(rawBody);

  expect(responseBody.userId).toBe("2");
  expect(responseBody.title).toBe(requestBody.title);
  expect(responseBody.body).toBe(requestBody.body);
});
