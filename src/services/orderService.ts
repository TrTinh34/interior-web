import { api } from "./api"
export const orderService = {
  create: (body: unknown) =>
    api("/orders", { method: "POST", body: JSON.stringify(body) }),
  getAll: () => api("/orders"),
  getById: (id: string) => api(`/orders/${id}`),
}
