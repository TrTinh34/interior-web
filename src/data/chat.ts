import { products, type Product } from "./store"

export type ChatOption = {
  label: string
  value: string
}

export type ChatMessage = {
  id: string
  role: "assistant" | "user" | "error"
  message: string
  timestamp: string
  options?: ChatOption[]
  products?: Product[]
}

export const initialChatMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  message:
    "Hi! 👋 I'm your personal decor assistant. I can help you find products that match your space, style and budget.",
  timestamp: "Just now",
  options: [
    { label: "Find products", value: "find-products" },
    { label: "Decorate my living room", value: "living-room" },
    { label: "Decorate my bedroom", value: "bedroom" },
    { label: "Find products under a budget", value: "budget" },
    { label: "Recommend a style", value: "style" },
    { label: "Find a gift", value: "gift" },
  ],
}

const styleOptions: ChatOption[] = [
  { label: "Modern", value: "modern" },
  { label: "Japandi", value: "japandi" },
  { label: "Scandinavian", value: "scandinavian" },
  { label: "Minimalist", value: "minimalist" },
  { label: "Vintage", value: "vintage" },
]

const budgetOptions: ChatOption[] = [
  { label: "Under $50", value: "under-50" },
  { label: "$50–$100", value: "50-100" },
  { label: "$100–$300", value: "100-300" },
  { label: "$300+", value: "300-plus" },
]

const productTypeOptions: ChatOption[] = [
  { label: "Lighting", value: "lighting" },
  { label: "Vases", value: "vases" },
  { label: "Table decor", value: "table-decor" },
  { label: "Decorative objects", value: "decorative-objects" },
]

export function getMockChatResponse(
  message: string,
  action?: string,
): Omit<ChatMessage, "id" | "timestamp" | "role"> {
  const value = (action ?? message).toLowerCase()

  if (value === "living-room" || value.includes("living room")) {
    return {
      message:
        "A living room is a lovely place to begin. What style feels most like you?",
      options: styleOptions,
    }
  }

  if (value === "bedroom" || value.includes("bedroom")) {
    return {
      message:
        "Let's create a bedroom that feels calm and personal. Which style would you like to explore?",
      options: styleOptions,
    }
  }

  if (value === "style" || value.includes("recommend a style")) {
    return {
      message:
        "I can help you find a visual direction. Which of these styles are you drawn to?",
      options: styleOptions,
    }
  }

  if (
    styleOptions.some((option) => option.value === value) ||
    styleOptions.some((option) => value.includes(option.label.toLowerCase()))
  ) {
    const style =
      styleOptions.find(
        (option) =>
          option.value === value || value.includes(option.label.toLowerCase()),
      )?.label ?? "your preferred"
    return {
      message: `${style} is a beautiful choice. What is your approximate budget for this update?`,
      options: budgetOptions,
    }
  }

  if (
    value === "budget" ||
    value === "find-products" ||
    value.includes("under a budget")
  ) {
    return {
      message:
        "Of course. Choose a comfortable budget and I'll find pieces that work beautifully within it.",
      options: budgetOptions,
    }
  }

  if (value === "gift" || value.includes("gift")) {
    return {
      message:
        "A thoughtful object for the home makes a wonderful gift. What would you like to explore?",
      options: productTypeOptions,
    }
  }

  if (
    budgetOptions.some((option) => option.value === value) ||
    /\$|budget|under|less than/.test(value)
  ) {
    const recommended =
      value === "under-50"
        ? products.slice(4, 7)
        : value === "50-100"
          ? products.filter((product) => product.price <= 100).slice(0, 3)
          : products.slice(0, 3)
    return {
      message:
        "I found these considered pieces that match your preferences. Each one layers easily into a warm, modern space.",
      products: recommended.length ? recommended : products.slice(0, 3),
      options: [
        { label: "Refine by material", value: "material" },
        { label: "Show more pieces", value: "show-more" },
      ],
    }
  }

  if (
    productTypeOptions.some((option) => option.value === value) ||
    value === "show-more" ||
    /lamp|vase|lighting|decor|product/.test(value)
  ) {
    return {
      message: "These pieces would make an elegant addition to the room.",
      products:
        value === "lighting"
          ? products.filter((product) => product.categoryName === "Lighting")
          : products.slice(2, 5),
      options: budgetOptions,
    }
  }

  if (value === "material") {
    return {
      message: "Which material would you like to bring into the room?",
      options: [
        { label: "Ceramic", value: "ceramic" },
        { label: "Natural wood", value: "wood" },
        { label: "Stone", value: "stone" },
        { label: "Linen", value: "linen" },
      ],
    }
  }

  if (/ceramic|wood|stone|linen/.test(value)) {
    return {
      message:
        "That material will add natural texture and depth. Here are a few pieces I would pair with your space.",
      products: products.slice(0, 3),
    }
  }

  return {
    message:
      "I'm not quite sure what you're looking for yet. Could you tell me the room, style or budget you have in mind?",
    options: initialChatMessage.options,
  }
}

export const chatErrorMessage =
  "Sorry, I'm having trouble connecting right now. Please try again or browse our products."
