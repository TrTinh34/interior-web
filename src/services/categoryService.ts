import { api } from "./api"

export const categoryService = {
  getAll: () => api("/categories"),
  getProducts: (categoryId: number) => api(`/products/category/${categoryId}`),
}
