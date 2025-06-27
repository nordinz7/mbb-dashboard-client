import config from '../config/app.config';

export async function fetchFromApi(
  endpoint: string,
  params: Record<string, string | number | undefined>,
  errorMsg: string,
) {
  const url = new URL(`${config.API_URL}/api/${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.append(key, String(value));
  });
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(errorMsg);
  return res.json();
}
