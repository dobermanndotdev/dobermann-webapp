// https://jasonwatmore.com/post/2020/04/18/fetch-a-lightweight-fetch-wrapper-to-simplify-http-requests

import { appConfig } from "@@/app/config";

export class HttpClient {
  private headers!: Headers;

  constructor(private baseUrl: string) {
    this.headers = new Headers({ "Content-Type": "application/json" });
  }

  private loadUrl(url: string) {
    if (this.baseUrl && !url.startsWith("http")) {
      return `${this.baseUrl}${url}`;
    }

    return url;
  }

  get(url: string) {
    const requestOptions = { method: "GET" };
    return fetch(this.loadUrl(url), requestOptions).then(this.handleResponse);
  }

  post(url: string, body: any) {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(body),
      headers: this.headers,
    };

    return fetch(this.loadUrl(url), requestOptions).then(this.handleResponse);
  }

  put(url: string, body: any) {
    const requestOptions = {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(body),
    };

    return fetch(this.loadUrl(url), requestOptions).then(this.handleResponse);
  }

  // prefixed with underscored because delete is a reserved word in javascript
  delete(url: string) {
    const requestOptions = {
      method: "DELETE",
    };
    return fetch(this.loadUrl(url), requestOptions).then(this.handleResponse);
  }

  // helper functions

  private handleResponse(response: Response) {
    return response.text().then((text) => {
      const data = text && JSON.parse(text);

      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      return data;
    });
  }
}

export const backendApiClient = new HttpClient(appConfig.apiUrl);
