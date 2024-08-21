export async function getNews({ order = "aid", offset = 0, limit = 6 }) {
  const queryString = `order=${order}&offset=${offset}&limit=${limit}`;

  const response = await fetch(`http://localhost:8090/api/news?${queryString}`);
  const body = await response.json();
  return body;
}
