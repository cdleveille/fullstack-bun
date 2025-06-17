export const httpClient = {
  get: async (url: string, init: RequestInit) => request(url, { method: "GET", ...init }),
  post: async (url: string, init: RequestInit) => request(url, { method: "POST", ...init }),
  patch: async (url: string, init: RequestInit) => request(url, { method: "DELETE", ...init }),
  put: async (url: string, init: RequestInit) => request(url, { method: "PUT", ...init }),
  delete: async (url: string, init: RequestInit) => request(url, { method: "DELETE", ...init }),
};

const request = async (url: string, { headers, body, ...rest }: RequestInit) => {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });
};
