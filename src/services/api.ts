const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api"

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
  }
}

export async function api<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem("accessToken")
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  if (!response.ok) {
    const messages: Record<number, string> = {
      400: "Please check the information you entered.",
      401: "Your session has expired. Please sign in again.",
      403: "You do not have permission to do that.",
      404: "The requested item could not be found.",
      409: "This request conflicts with existing information.",
      500: "Something went wrong. Please try again.",
    }
    throw new ApiError(
      response.status,
      messages[response.status] ?? "Something went wrong. Please try again.",
    )
  }
  return response.json() as Promise<T>
}
