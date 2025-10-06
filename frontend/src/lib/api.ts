export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}` as RequestInfo, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error('API error');
  return res.json();
}
