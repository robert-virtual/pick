interface Res<T> {
  data: T | any;
  status: number;
  ok: boolean;
  redirected: boolean;
  type: ResponseType;
  url: string;
}

interface IPick {
  get: <T>(url: string, query?: any, options?: RequestInit) => Promise<Res<T>>;
  post: <T>(
    url: string,
    body?: BodyInit,
    options?: RequestInit
  ) => Promise<Res<T>>;
}

export const pick: IPick = {
  async get(url, query, options) {
    if (query) {
      url += "?";
      for (let k in query) {
        url += `${k}=${query[k]}&`;
      }
    }
    const res = await fetch(url, options);
    const data = await res.json();
    return { ...res, data };
  },

  async post(url, body, options) {
    let headers = new Headers();
    if (body) {
      body = JSON.stringify(body);
      headers.append("Content-Type", "Application/json");
    }
    const res = await fetch(url, {
      method: "post",
      headers,
      ...options,
      body,
    });
    const data = await res.json();
    return {
      status: res.status,
      data,
      ok: res.ok,
      redirected: res.redirected,
      type: res.type,
      url: res.url,
    };
  },
};
