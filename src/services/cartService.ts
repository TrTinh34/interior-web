import { api } from "./api"
export const cartService = {
  get: () => api("/cart"),
  add: (productId: number) =>
    api("/cart/items", {
      method: "POST",
      body: JSON.stringify({ productId, quantity: 1 }),
    }),
  update: (id: number, quantity: number) =>
    api(`/cart/items/${id}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    }),
  remove: (id: number) => api(`/cart/items/${id}`, { method: "DELETE" }),
}
