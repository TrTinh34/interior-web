import { api } from "./api"
export const wishlistService = {
  get: () => api("/wishlist"),
  add: (id: number) => api(`/wishlist/${id}`, { method: "POST" }),
  remove: (id: number) => api(`/wishlist/${id}`, { method: "DELETE" }),
}
