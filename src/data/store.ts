export type Product = {
  id: number
  name: string
  categoryName: string
  price: number
  originalPrice?: number
  imageUrl: string
  rating: number
  reviewCount: number
  stock: number
  badge?: string
}

export const photos = {
  hero: "https://images.unsplash.com/photo-1772797583328-f83bc3f94f80?auto=format&fit=crop&w=1800&q=88",
  dining:
    "https://images.unsplash.com/photo-1777041097323-2f2ab6734a82?auto=format&fit=crop&w=1600&q=85",
  office:
    "https://images.unsplash.com/photo-1766330977451-de1b64b5e641?auto=format&fit=crop&w=1400&q=85",
  collection:
    "https://images.unsplash.com/photo-1753800558729-7929703f81de?auto=format&fit=crop&w=1400&q=85",
  lamp: "https://images.unsplash.com/photo-1667312939978-64cf31718a6e?auto=format&fit=crop&w=1000&q=85",
  vase: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1000&q=85",
  bowl: "https://images.unsplash.com/photo-1544207240-8b1025eb7aeb?auto=format&fit=crop&w=1000&q=85",
  vases:
    "https://images.unsplash.com/photo-1676534967649-de5853869036?auto=format&fit=crop&w=1000&q=85",
  planter:
    "https://images.unsplash.com/photo-1707348102704-9bc749b20199?auto=format&fit=crop&w=1000&q=85",
  shelf:
    "https://images.unsplash.com/photo-1735030921637-cac412ac1d6e?auto=format&fit=crop&w=1000&q=85",
  pedestal:
    "https://images.unsplash.com/photo-1788663083189-b1ad9abbfe18?auto=format&fit=crop&w=1000&q=85",
  stillLife:
    "https://images.unsplash.com/photo-1642689703515-1dcf91a784a5?auto=format&fit=crop&w=1000&q=85",
  sofa: "https://images.unsplash.com/photo-1761330439252-325f2091e88d?auto=format&fit=crop&w=1200&q=85",
  candle:
    "https://images.unsplash.com/photo-1759936236914-e8b1ac061030?auto=format&fit=crop&w=1000&q=85",
}

export const products: Product[] = [
  {
    id: 1,
    name: "Sora Ceramic Table Lamp",
    categoryName: "Lighting",
    price: 189,
    originalPrice: 229,
    imageUrl: photos.lamp,
    rating: 4.9,
    reviewCount: 124,
    stock: 25,
    badge: "New",
  },
  {
    id: 2,
    name: "Aino Sculptural Vase",
    categoryName: "Vases",
    price: 78,
    imageUrl: photos.vase,
    rating: 4.8,
    reviewCount: 86,
    stock: 14,
  },
  {
    id: 3,
    name: "Travertine Catchall Bowl",
    categoryName: "Table Decor",
    price: 94,
    imageUrl: photos.bowl,
    rating: 4.7,
    reviewCount: 51,
    stock: 9,
  },
  {
    id: 4,
    name: "Forma Earthenware Vessels",
    categoryName: "Decorative Objects",
    price: 128,
    originalPrice: 152,
    imageUrl: photos.vases,
    rating: 4.9,
    reviewCount: 73,
    stock: 18,
    badge: "Sale",
  },
  {
    id: 5,
    name: "Lina Stone Planter",
    categoryName: "Plants & Planters",
    price: 64,
    imageUrl: photos.planter,
    rating: 4.6,
    reviewCount: 42,
    stock: 32,
  },
  {
    id: 6,
    name: "Noma Minimal Vessel",
    categoryName: "Vases",
    price: 72,
    imageUrl: photos.shelf,
    rating: 4.8,
    reviewCount: 67,
    stock: 12,
  },
  {
    id: 7,
    name: "Mori Branch Vase",
    categoryName: "Vases",
    price: 118,
    imageUrl: photos.pedestal,
    rating: 4.9,
    reviewCount: 95,
    stock: 7,
    badge: "Bestseller",
  },
  {
    id: 8,
    name: "Onda Linen Table Lamp",
    categoryName: "Lighting",
    price: 214,
    imageUrl: photos.stillLife,
    rating: 4.7,
    reviewCount: 38,
    stock: 16,
  },
]

export const categories = [
  "Lighting",
  "Wall Art",
  "Vases",
  "Rugs",
  "Mirrors",
  "Decorative Objects",
  "Candles",
  "Table Decor",
  "Storage",
  "Plants & Planters",
].map((name, i) => ({
  id: i + 1,
  name,
  count: 24 + i * 7,
  imageUrl: [
    photos.lamp,
    photos.hero,
    photos.vase,
    photos.sofa,
    photos.collection,
    photos.vases,
    photos.candle,
    photos.bowl,
    photos.shelf,
    photos.planter,
  ][i],
}))

export const orders = [
  {
    id: "ARB-10482",
    date: "Oct 5, 2026",
    items: 3,
    total: "$416.00",
    status: "Processing",
  },
  {
    id: "ARB-10296",
    date: "Sep 18, 2026",
    items: 2,
    total: "$267.00",
    status: "Delivered",
  },
  {
    id: "ARB-09841",
    date: "Aug 27, 2026",
    items: 1,
    total: "$118.00",
    status: "Delivered",
  },
]
