import { products, type Product } from "../data/store"
import { api } from "./api"

const mock = async <T>(data: T) => Promise.resolve({ data, success: true })
export const productService = {
  getAll: (useMock = true) =>
    useMock ? mock(products) : api<{ data: Product[] }>("/products"),
  getById: (id: number, useMock = true) =>
    useMock
      ? mock(products.find((p) => p.id === id))
      : api<{ data: Product }>(`/products/${id}`),
}
