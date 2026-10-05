import { api } from "./api"

export const reviewService = {
  getForProduct: (productId: number) => api(`/products/${productId}/reviews`),
  create: (productId: number, body: unknown) =>
    api(`/products/${productId}/reviews`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
}
