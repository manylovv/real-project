export async function fetcher<JSON = unknown>(
  input: RequestInfo
): Promise<JSON> {
  const res = await fetch(input);
  return res.json();
}
