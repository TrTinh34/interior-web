import {
  getMockChatResponse,
  type ChatMessage,
  type ChatOption,
} from "../data/chat"
import type { Product } from "../data/store"
import { api } from "./api"

export type ChatRequest = {
  conversationId: string
  message: string
  action?: string
}

export type ChatResponse = {
  message: string
  products?: Product[]
  options?: ChatOption[]
}

const wait = (duration: number) =>
  new Promise((resolve) => window.setTimeout(resolve, duration))

export const chatService = {
  async send(request: ChatRequest, useMock = true): Promise<ChatResponse> {
    if (!useMock) {
      return api<ChatResponse>("/chat", {
        method: "POST",
        body: JSON.stringify({
          conversationId: request.conversationId,
          message: request.message,
        }),
      })
    }

    await wait(650)
    return getMockChatResponse(request.message, request.action)
  },

  toMessage(response: ChatResponse): ChatMessage {
    return {
      id: crypto.randomUUID(),
      role: "assistant",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      ...response,
    }
  },
}
