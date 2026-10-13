import type { APIRequestContext, APIResponse, TestInfo } from '@playwright/test';

export class ApiClient {
  constructor(
    private request: APIRequestContext,
    private testInfo: TestInfo,
  ) {}

  async get(url: string, options?: Parameters<APIRequestContext['get']>[1]): Promise<APIResponse> {
    const response = await this.request.get(url, options);
    await this.log('GET', url, options?.data, response);
    return response;
  }

  async post(url: string, options?: Parameters<APIRequestContext['post']>[1]): Promise<APIResponse> {
    const response = await this.request.post(url, options);
    await this.log('POST', url, options?.data, response);
    return response;
  }

  async put(url: string, options?: Parameters<APIRequestContext['put']>[1]): Promise<APIResponse> {
    const response = await this.request.put(url, options);
    await this.log('PUT', url, options?.data, response);
    return response;
  }

  async patch(url: string, options?: Parameters<APIRequestContext['patch']>[1]): Promise<APIResponse> {
    const response = await this.request.patch(url, options);
    await this.log('PATCH', url, options?.data, response);
    return response;
  }

  async delete(url: string, options?: Parameters<APIRequestContext['delete']>[1]): Promise<APIResponse> {
    const response = await this.request.delete(url, options);
    await this.log('DELETE', url, options?.data, response);
    return response;
  }

  private async log(method: string, url: string, requestBody: unknown, response: APIResponse): Promise<void> {
    const contentType = response.headers()['content-type'] ?? '';
    let body: unknown;
    try {
      if (contentType.includes('application/json')) {
        body = await response.json();
      } else {
        body = await response.text();
      }
    } catch {
      body = '<could not read body>';
    }

    const record = {
      method,
      url,
      request: requestBody ?? null,
      response: {
        status: response.status(),
        statusText: response.statusText(),
        headers: response.headers(),
        body,
      },
      timestamp: new Date().toISOString(),
    };

    await this.testInfo.attach(`${method} ${url}`, {
      body: JSON.stringify(record, null, 2),
      contentType: 'application/json',
    });
  }
}