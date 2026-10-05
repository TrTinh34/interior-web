import { api } from "./api"

export const userService = {
  getCurrent: () => api("/users/me"),
  updateCurrent: (body: unknown) =>
    api("/users/me", { method: "PUT", body: JSON.stringify(body) }),
}
