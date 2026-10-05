import { api } from "./api"
export const authService = {
  login: (body: { email: string password: string }) =>
    api("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  register: (body: unknown) =>
    api("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  me: () => api("/users/me"),
  logout: () => localStorage.removeItem("accessToken"),
}
