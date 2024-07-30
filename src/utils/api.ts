export const api = {
  get: async (path: string) => {
    const res = await fetch(`${process.env.BACKEND_URL}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    if (res.ok) {
      return res;
    }
    throw new Error(`${res.status} error: ${res.statusText}`);
  },
  post: async (path: string, data: unknown) => {
    const res = await fetch(`${process.env.BACKEND_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(res);
    if (res.ok) {
      return res;
    }
    throw new Error(`${res.status} error: ${res.statusText}`);
  },
};
