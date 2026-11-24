const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  [key: string]: any;
}

export async function fetchApi<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('wedplan_token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  let response: Response;
  try {
    response = await fetch(url, {
      credentials: 'include',
      signal: controller.signal,
      ...options,
      headers,
    });
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      throw new Error('Request timed out. Please check your connection and try again.');
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }

  const data = await response.json().catch(() => ({
    success: false,
    message: 'Failed to parse JSON response from server.',
  }));

  if (!response.ok) {
    // If account blocked or unauthorized
    if (response.status === 403 && data.message?.toLowerCase().includes('blocked')) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('wedplan_token');
        localStorage.removeItem('wedplan_user');
      }
    }
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
}
