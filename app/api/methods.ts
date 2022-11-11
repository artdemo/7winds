export const GET = (path: string) =>
  fetch(`${process.env.BASE_URL}/${path}`).then((response) => response.json());

export const POST = (path: string, body: object) =>
  fetch(`${process.env.BASE_URL}/${path}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  }).then((response) => response.json());

export const DELETE = (path: string) =>
  fetch(`${process.env.BASE_URL}/${path}`, {
    method: 'DELETE',
  }).then((response) => response.json());
